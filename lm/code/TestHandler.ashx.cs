using CSharpUtils.Log4netUtil;
using GeetestSDK;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

using System.Web.Script.Serialization;

namespace SiteServer.Web.code
{
    /// <summary>
    /// TestHandler 的摘要说明
    /// </summary>
    public class TestHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        Config config = Config.Instance();
        Dictionary<string, InfoType> dict = new Dictionary<string, InfoType>();

        public TestHandler()
        {
            dict.Add("bSms", new InfoType { Type = config.Type_sms, Productid = config.ProductId_sms, Limit = config.Limit_sms });
            dict.Add("bInternationalSms", new InfoType { Type = config.Type_international_sms, Productid = config.ProductId_international_sms, Limit = config.Limit_international_sms });
            dict.Add("bVoice", new InfoType { Type = config.Type_voice, Productid = config.ProductId_voice, Limit = config.Limit_voice });
            dict.Add("bMms", new InfoType { Type = config.Type_mms, Productid = config.ProductId_mms, Limit = config.Limit_mms });
        }

        public void ProcessRequest(HttpContext context)
        {
            bool bSuccess = false;
            string cntResult = "出现未知错误";
            try
            {
                string mobile = context.Request["mobile"];
                string id = context.Request["id"];
                string ip = HttpContext.Current.Request.UserHostAddress;
                string log = string.Format("ProcessRequest调用,mobile={0},id={1},ip={2}", mobile, id, ip);
                log4netWriter.WriteLog(new LogEventArgs(this.GetType(), LogLevel.DEBUG, log, null));

                if (Check(context))
                {
                    int ipTimes = GetIpTestTimes(ip);
                    if (ipTimes < config.Limit_ip)
                    {
                        int times = GetTestTimes(mobile, dict[id].Type);
                        if (times < dict[id].Limit)
                        {
                            if (id == "bMms")
                            {
                                MmsServiceReference.MmsWebInterfaceSoapClient mms = new MmsServiceReference.MmsWebInterfaceSoapClient();
                                var result = mms.SubmitMms(config.AccountId, config.Password, "", config.ProductId_mms, mobile, "测试彩信", config.Content_mms);
                                bSuccess = result.State == 0;
                                cntResult = result.MsgState;
                            }
                            else
                            {
                                string msg = string.Empty;
                                switch (id)
                                {
                                    case "bSms":
                                        msg = config.Content_sms;
                                        break;
                                    case "bInternationalSms":
                                        msg = config.Content_international_sms;
                                        break;
                                    case "bVoice":
                                        msg = config.Content_voice;
                                        break;
                                    default:
                                        msg = config.Content_sms;
                                        break;
                                }
                                SmsServiceReference.Service1SoapClient sms = new SmsServiceReference.Service1SoapClient();
                                var result = sms.g_Submit(config.AccountId, config.Password, "", dict[id].Productid, mobile, msg);
                                bSuccess = result.State == 0;
                                cntResult = result.MsgState;
                            }
                            if (bSuccess)
                            {
                                AddTestRecord(mobile, dict[id].Type, ip);
                            }
                        }
                        else
                        {
                            log = string.Format(config.LimitMessage, mobile, dict[id].Type, dict[id].Limit);
                            cntResult = log;
                        }
                    }
                    else
                    {
                        log = string.Format(config.IpLimitMessage, config.Limit_ip);
                        cntResult = log;
                    }
                }
                else
                {
                    cntResult = config.CheckFailMessage;
                }
            }
            catch (Exception ex)
            {
                log4netWriter.WriteLog(new LogEventArgs(this.GetType(), LogLevel.ERROR, "ProcessRequest", ex));
                cntResult = string.Format("出现未知错误->{0}", ex.Message);
            }

            JsonResult jResult = new code.JsonResult();
            jResult.bSuccess = bSuccess;
            jResult.message = cntResult;
            JavaScriptSerializer jSer = new JavaScriptSerializer();
            string jsonStr = jSer.Serialize(jResult);
            context.Response.Write(jsonStr);
        }

        /// <summary>
        /// 手机号码限制
        /// </summary>
        /// <param name="mobile"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        private int GetTestTimes(string mobile, string type)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("SELECT COUNT(*) FROM [siteserver_InputContent]");
            sb.AppendFormat(" WHERE AddDate >= '{0}' AND AddDate < '{1}'"
                , DateTime.Now.Date.ToString("yyyy-MM-dd"), DateTime.Now.Date.AddDays(1).ToString("yyyy-MM-dd"));
            sb.AppendFormat(" AND [SettingsXML] LIKE 'mobile={0}&type={1}%'", mobile, type);
            using (SqlConnection cn = new SqlConnection(config.ConnectionString))
            using (SqlCommand cmd = new SqlCommand())
            {
                if (cn.State != System.Data.ConnectionState.Open)
                {
                    cn.Open();
                }
                cmd.Connection = cn;
                cmd.CommandText = sb.ToString();
                object obj = cmd.ExecuteScalar();
                return (int)obj;
            }
        }

        /// <summary>
        /// IP限制
        /// </summary>
        /// <param name="ip"></param>
        /// <returns></returns>
        private int GetIpTestTimes(string ip)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("SELECT COUNT(*) FROM [siteserver_InputContent]");
            sb.AppendFormat(" WHERE AddDate >= '{0}' AND AddDate < '{1}'", DateTime.Now.Date.ToString("yyyy-MM-dd"), DateTime.Now.Date.AddDays(1).ToString("yyyy-MM-dd"));
            sb.AppendFormat(" AND IPAddress = '{0}' ", ip);
            using (SqlConnection cn = new SqlConnection(config.ConnectionString))
            using (SqlCommand cmd = new SqlCommand())
            {
                if (cn.State != System.Data.ConnectionState.Open)
                {
                    cn.Open();
                }
                cmd.Connection = cn;
                cmd.CommandText = sb.ToString();
                object obj = cmd.ExecuteScalar();
                return (int)obj;
            }
        }

        private int AddTestRecord(string mobile, string type, string ip)
        {
            string date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            string data = string.Format("mobile={0}&type={1}&createtime={2}", mobile, type, date);
            StringBuilder sb = new StringBuilder();
            sb.Append("INSERT INTO[siteserver_InputContent]");
            sb.Append("([InputID],[Taxis],[IsChecked],[UserName],[IPAddress],[Location],[AddDate],[Reply],[SettingsXML])");
            sb.AppendFormat(" VALUES(1, 1, 'true', '', '{0}', '', getdate(), '', '{1}')", ip, data);
            using (SqlConnection cn = new SqlConnection(config.ConnectionString))
            using (SqlCommand cmd = new SqlCommand())
            {
                if (cn.State != System.Data.ConnectionState.Open)
                {
                    cn.Open();
                }
                cmd.Connection = cn;
                cmd.CommandText = sb.ToString();
                return cmd.ExecuteNonQuery();
            }
        }

        private bool Check(HttpContext context)
        {
            GeetestLib geetest = new GeetestLib(config.publicKey, config.privateKey);
            Byte gt_server_status_code = (Byte)context.Session[GeetestLib.gtServerStatusSessionKey];
            String userID = (String)context.Session["userID"];
            int result = 0;
            String challenge = context.Request.Form.Get(GeetestLib.fnGeetestChallenge);
            String validate = context.Request.Form.Get(GeetestLib.fnGeetestValidate);
            String seccode = context.Request.Form.Get(GeetestLib.fnGeetestSeccode);
            if (gt_server_status_code == 1) result = geetest.enhencedValidateRequest(challenge, validate, seccode, userID);
            else result = geetest.failbackValidateRequest(challenge, validate, seccode);
            //if (result == 1) Response.Write("success");
            //else Response.Write("fail");
            return result == 1;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }

    class InfoType
    {
        public string Type;
        public string Productid;
        public int Limit;
    }
}