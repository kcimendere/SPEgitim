sap.ui.define([
    "com/sp/zattendee/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    function (BaseController, MessageToast, Filter, FilterOperator) {
        "use strict";

        return BaseController.extend("com.sp.zattendee.controller.App",
            {
                onInit: function () {
                    this.getRouter().getRoute("RouteApp").attachPatternMatched(this.onObjectMatched, this);

                },
                onObjectMatched:function(oEvent){

                },
                onPress: function (oEvent) {
                    // this.getView().byId("idText").setText(this.getView().byId("ideMyFirstInput"). ());
                    // alert("My First Action");
                    // console.log(oEvent);
                },
                handleInputLiveChange: function (oEvent) {
                },
                handlePressAddNewAttendee: function (oEvent) {
                    MessageToast.show("Attendee ekleme butonuna basıldı.");
                    var oModel = this.getOwnerComponent().getModel();
                    var newEntryContext = oModel.createEntry("/AtendeeSet");
                    var sNewEntryPath = newEntryContext.getPath();
                    const oRouter = this.getRouter();
                    oRouter.navTo("Detail", {
                        detailPath: window.encodeURIComponent(sNewEntryPath.substr(1))
                    });
                    // var oDialog = this.getAtendeeDialog();
                    // oDialog.bindElement({
                    //     path: sNewEntryPath
                    //     // events: {
                    //     //     change: function() {},
                    //     //     dataRequested: function () {

                    //     //     },
                    //     //     dataReceived: function () {
                    //     //     }
                    //     // }
                    // });
                    // oDialog.open();
                },
                handleAttendeeDialogClose: function (oEvent) {
                    var oDialog = this.getAtendeeDialog();
                    oDialog.close();
                    this._attendeeDialog.destroy();
                    this.clearPendingChanges();
                    delete this._attendeeDialog;
                },
                getAtendeeDialog: function () {
                    if (!this._attendeeDialog) {
                        this._attendeeDialog = sap.ui.xmlfragment("com.sp.zattendee.fragment.Atendee",
                            this);
                        this.getView().addDependent(this._attendeeDialog);
                    }
                    return this._attendeeDialog;
                },
                handleRowDelete: function (oEvent) {
                    // var oEvent
                    var sPathToBeRemoved = oEvent.getParameter("listItem").getBindingContext().getPath();
                    var oModel = this.getView().getModel();
                    oModel.remove(sPathToBeRemoved);
                    oModel.submitChanges({
                        success: function (oData, oResponse) {
                            console.log(oData);
                        },
                        error: function (oError) {
                            console.log(oError);
                        }
                    });
                    // var items = oModel.getProperty("/TrainingAttendees")
                    // var indexTobeRemoved;
                    // for (var i = 0, len = items.length; i < len; i++) {
                    //     if (items[i].ID == ID) {
                    //         indexTobeRemoved = i;
                    //         break;
                    //     }
                    // }
                    // items.splice(indexTobeRemoved, 1);
                    // oModel.refresh();

                },
                handleAttendeeListItemPress: function (oEvent) {
                    var oSelectedBindingContext = oEvent.getSource().getBindingContext();
                    var selectedPath = oSelectedBindingContext.getPath();

                    const oRouter = this.getRouter();
                    oRouter.navTo("Detail", {
                        detailPath: window.encodeURIComponent(selectedPath.substr(1))
                    });

                    // var oDialog = this.getAtendeeDialog();
                    // oDialog.bindElement({
                    //     path: selectedPath
                    // });
                    // oDialog.open();

                },
                handleAttendeeSearch: function (oEvent) {
                    var sQuery = oEvent.getParameter("query");
                    var aFilters = [];
                    if (sQuery) {
                        var nameFilter = new Filter({ path: "Name", operator: FilterOperator.EQ, value1: sQuery });
                        aFilters.push(nameFilter);
                    }
                    this.getView().byId("idProductsTable").getBinding("items").filter(aFilters);

                }
            }
        );
    });
