sap.ui.define([
    "com/sp/zattendee/controller/BaseController",
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.sp.zattendee.controller.Detail",
            {            
                onInit: function () {
                    const oRouter = this.getRouter();
                    oRouter.getRoute("Detail").attachPatternMatched(this.onObjectMatched, this);

                },
                onObjectMatched:function(oEvent){
                    var oArgs = oEvent.getParameter("arguments");

                    if(!oArgs || !oArgs.detailPath){
                        const oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("RouteApp");
                        return;
                    }
                    this.getView().bindElement("/"+oArgs.detailPath);
                },
                onNavBack:function(oEvent){
                    this.clearPendingChanges();
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteApp", {}, true);
                }
            }
            );
        });