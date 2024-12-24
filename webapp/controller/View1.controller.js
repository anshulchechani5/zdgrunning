sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("zdgrunning.controller.View1", {
            onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel(), "oFirstTableDataModel");
                this.getView().getModel("oFirstTableDataModel").setProperty("/aFirstTableData", []);
            },
              addrow: function () {

                var TableModel = this.getView().getModel("oFirstTableDataModel");
                var aTableArr = TableModel.getProperty("/aFirstTableData")
                var aTablearr = [];
                    var obj = {
        
                        DGNO: "",
                        Date: "",
                        dgstarttime: "",
                        dgendtime: "",
                        dgtotaltime: "",
                        disellevalstart:"",
                        disellevelend:"",
                        totaldiselconsumption:"",
                        diselrec:"",
                    }
            
                    aTableArr.push(obj);
                    TableModel.setProperty("/aFirstTableData", aTableArr)
              },
              disellevel:function(oEvent){
                var oContext = oEvent.getSource().getBindingContext('oFirstTableDataModel').getObject();
                var disellevalstart = Number(oContext.disellevalstart);
                var disellevalend = Number(oContext.disellevelend);
                var a =  disellevalstart - disellevalend;
                oEvent.getSource().getBindingContext("oFirstTableDataModel").getObject().totaldiselconsumption = a
              },
              savedata: function () {
                    var oBusyDialog = new sap.m.BusyDialog({
                        text: "Please wait"
                    });
                    oBusyDialog.open();
                    var table1 = this.getView().getModel("oFirstTableDataModel").getProperty("/aFirstTableData");

                    this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(), "oTableDataModel1");
                    this.getOwnerComponent().getModel("oTableDataModel1").setProperty("/aTableData1", []);
                    var TableModel1 = this.getOwnerComponent().getModel("oTableDataModel1");
    
                    var aTablearr1 = [];
                    table1.map(function (data1) {
                        // var PostingDate=data1.Date;
                        // if(PostingDate.length === 10 ){
                        //     var yyyy= PostingDate.slice(0,4);
                        //     var mm =PostingDate.slice(5,7);
                        //     var dd =PostingDate.slice(8,10);
                        //     var dte1 = yyyy  + mm + dd;
                        // }
                        // else if(PostingDate.length === 9 ){
                        //     var yyyy= PostingDate.slice(0,4);
                        //     var mm =PostingDate.slice(5,6);
                        //     mm = "0" + mm;
                        //     var dd =PostingDate.slice(7,9);
                        //     var dte1 = yyyy  + mm + dd;
                        // }
                        // else if(PostingDate.length === 8 ){
                        //     var yyyy= PostingDate.slice(0,4);
                        //     var mm =PostingDate.slice(5,6);
                        //     mm = "0" + mm;
                        //     var dd =PostingDate.slice(7,8);
                        //     dd = "0" + dd;
                        //     var dte1 = yyyy  + mm + dd;
                        // }
                        // var date =dte1;
                        var items1 = {
                            DGNO: data1.DGNO,
                            Date: data1.Date,
                            dgstarttime: data1.dgstarttime,
                            dgendtime: data1.dgendtime,
                            dgtotaltime: data1.dgtotaltime,
                            disellevalstart:data1.disellevalstart,
                            disellevelend:data1.disellevelend,
                            totaldiselconsumption:data1.totaldiselconsumption,
                            diselrec:data1.diselrec,
                        }
                        aTablearr1.push(items1);
                    })
                    TableModel1.setProperty("/aTableData1", aTablearr1)
    
                    
                    var url4 = "/sap/bc/http/sap/zpm_dg_running_http?sap-client=080";
                    var url1 ="&action="
                    var url2 = url1 + "Create";

                    var url = url4 + url2;
                    $.ajax({
                        type: "post",
                        url: url,
                        data: JSON.stringify({
                            aTablearr1
                        }),
                        contentType: "application/json; charset=utf-8",
                        traditional: true,
                        success: function (data) {
                            oBusyDialog.close();
                            MessageBox.show(data
                                , {
                                    onClose: function (oAction) {
                                        if (oAction === MessageBox.Action.OK) {
                                            window.location.reload();
                                        }
                                    }
                                });
                        }.bind(this),
                        error: function (error) {
                            oBusyDialog.close();
                            MessageBox.error(error);
                        }
    
                    })
            },
        });
    });
