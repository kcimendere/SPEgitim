sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/Fragment"
], function (Controller, History, Fragment) {
	"use strict";
	return Controller.extend("com.sp.zattendee.controller.BaseController", {	
		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},
        handleAttendeeSave: function (oEvent) {
            var oModel = this.getOwnerComponent().getModel();
            var that = this;
			var oRouter = this.getRouter();
            oModel.submitChanges({
                success: function (oData, oResponse) {
                    // that.handleAttendeeDialogClose();
                    console.log(oData);
					oRouter.navTo("RouteApp");
                },
                error: function (oError) {
					oRouter.navTo("RouteApp");
                    console.log(oError);
                }
            });

        },
        onNavBack:function(oEvent){
            const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteApp", {}, true);
			}
        },
        clearPendingChanges: function () {
            var oModel = this.getOwnerComponent().getModel();
            var aPendingChanges = oModel.getPendingChanges();
            var aPaths = [];
            for (var key in aPendingChanges) {
                aPaths.push("/" + key);
            }
            oModel.resetChanges(aPaths, true);
        },
        onMessagePopoverPress:function(oEvent){
            var oSourceControl = oEvent.getSource();
			this._getMessagePopover().then(function(oMessagePopover){
				oMessagePopover.openBy(oSourceControl);
			});
        },
        _getMessagePopover : function () {
			var oView = this.getView();

			// create popover lazily (singleton)
			if (!this._pMessagePopover) {
				this._pMessagePopover = Fragment.load({
					id: oView.getId(),
					name: "com.sp.zattendee.fragment.MessagePopover"
				}).then(function (oMessagePopover) {
					oView.addDependent(oMessagePopover);
					return oMessagePopover;
				});
			}
			return this._pMessagePopover;
		}
    });

});