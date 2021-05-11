import { ref, reactive } from "@vue/composition-api";

// import {
//   getProtocolForSearch,
//   getBusinessModel as getBusinessModelApi,
// } from "@/api/BillQueryDetails.js";
// import { downloadBillfile } from "@/api/FileDownLoadController";

export default function agreementMixin(): any {
  const protocols = reactive([]),
    isShowProtocolViewer = ref(false),
    isShowDownloadDialog = ref(false),
    protocolViewerParams = reactive({
      id: "",
      billId: "",
      billCode: "",
      protocolQueryType: "",
      type: "",
      view: "",
      orderType: "",
      sellState: "",
      sellApplyId: "",
    }),
    downloadDialogParams = reactive({
      baseId: "", // 判断母单还是子单
      isCanCreated: false, // 判断一级供应商完成【转让确认】签署任务
      businessModel: "",
      businessModelName: "",
      protocolList: [], // 展示协议名称
    }),
    getProtocols = async () => {
      console.log("getProtocols");
    },
    openDownloadDialog = () => {
      console.log("openDownloadDialog");
    },
    closeDownloadDialog = () => {
      console.log("closeDownloadDialog");
    },
    getBusinessModel = async () => {
      console.log("getBusinessModel");
    },
    downloadAllProtocols = () => {
      console.log("downloadAllProtocols");
    },
    ifGoToDownloadCenter = () => {
      console.log("ifGoToDownloadCenter");
    };

  return {
    protocols,
    isShowProtocolViewer,
    isShowDownloadDialog,
    protocolViewerParams,
    downloadDialogParams,
    getProtocols,
    openDownloadDialog,
    closeDownloadDialog,
    getBusinessModel,
    downloadAllProtocols,
    ifGoToDownloadCenter,
  };
}
