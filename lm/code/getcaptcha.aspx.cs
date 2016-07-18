using GeetestSDK;
using SiteServer.Web.code;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class code_getcaptcha : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.ContentType = "application/json";
        Response.Write(getCaptcha());
        Response.End();
    }
    
    private String getCaptcha()
    {
        GeetestLib geetest = new GeetestLib(Config.Instance().publicKey, Config.Instance().privateKey);
        String userID = "test";
        Byte gtServerStatus = geetest.preProcess(userID);
        Session[GeetestLib.gtServerStatusSessionKey] = gtServerStatus;
        Session["userID"] = userID;
        string result = geetest.getResponseStr();
        return result;
    }
}