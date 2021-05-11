<template>
  <div class="home">
    <div class="wrap-option bg-white mt-20" ref="RefWrapOption">
      <el-row :gutter="0" class="first-block fs-14 color-black">
        <el-col :span="2">信单编号</el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入信单编号"
            size="medium"
            class="w-100p"
            v-model="form.billCode"
            maxlength="20"
          ></el-input>
        </el-col>

        <el-col :span="2" :offset="1">信单金额</el-col>
        <el-col :span="5">
          <el-input
            placeholder="最小金额"
            size="medium"
            v-model="form.billMinMoney"
            class="w-88"
            maxlength="20"
          ></el-input>
          <span class="absolute pl-4 color-gray">-</span>
          <el-input
            placeholder="最大金额"
            size="medium"
            v-model="form.billMaxMoney"
            class="w-88 ml-19"
            maxlength="20"
          ></el-input>
        </el-col>

        <el-col :span="2" :offset="1">开单日</el-col>
        <el-col :span="7">
          <el-date-picker
            class="w-270"
            :editable="false"
            v-model="form.outputDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
      </el-row>

      <el-row :gutter="0" class="middle-block fs-14 color-black">
        <el-col :span="2">开单企业</el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入开单企业"
            size="medium"
            class="w-100p"
            v-model="form.outputName"
            maxlength="40"
          ></el-input>
        </el-col>

        <el-col :span="2" :offset="1">收单企业</el-col>
        <el-col :span="5">
          <el-input
            placeholder="请输入收单企业"
            size="medium"
            class="w-200"
            v-model="form.inputName"
            maxlength="40"
          ></el-input>
        </el-col>

        <el-col :span="2" :offset="1">到期日</el-col>
        <el-col :span="7">
          <el-date-picker
            class="w-270"
            :editable="false"
            v-model="form.maturityDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
      </el-row>

      <el-row :gutter="0" class="last-block fs-14 color-black">
        <el-col :span="2">开单状态</el-col>
        <el-col :span="3">
          <el-select
            v-model="form.queryType"
            placeholder="全部"
            size="medium"
            class="w-100p"
          >
            <el-option
              v-for="item in billStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="0" class="last-block">
        <el-col :span="20" :offset="2">
          <el-button
            type="primary"
            size="medium"
            icon="iconfont icon-sousuo"
            @click="getList"
            >查询</el-button
          >
          <el-button
            size="medium"
            icon="iconfont icon-shanchuqingkong"
            @click="resetSearch"
            >清空</el-button
          >
          <el-button
            size="medium"
            icon="iconfont icon-daochu"
            @click="exportExcel"
            >导出excel</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onActivated,
  getCurrentInstance,
  ComponentInternalInstance,
  onBeforeMount,
  onMounted,
  SetupContext,
} from "@vue/composition-api";
import agreementMixin from "./composables/agreement";

interface IBillStatusItem {
  name: string;
  value: string;
}

export default defineComponent({
  name: "Home",
  setup(props: any, context: SetupContext) {
    let hasData = ref(false),
      billStatus: Array<IBillStatusItem> = reactive([]),
      form = reactive({
        billCode: "",
        billMaxMoney: "",
        billMinMoney: "",
        maturityDate: [],
        outputDate: [],
        inputName: "",
        outputName: "",
        queryType: "",
      }),
      pageSize = ref(10),
      pageNum = ref(1),
      total = ref(0),
      list: any = ref([]),
      blockHeight = ref(0),
      maturityStartDate = computed(() => {
        return form.maturityDate && form.maturityDate[0]
          ? form.maturityDate[0]
          : "";
      }),
      maturityEndDate = computed(() => {
        return form.maturityDate && form.maturityDate[1]
          ? form.maturityDate[1]
          : "";
      }),
      outputStartDate = computed(() => {
        return form.outputDate && form.outputDate[0] ? form.outputDate[0] : "";
      }),
      outputEndDate = computed(() => {
        return form.outputDate && form.outputDate[1] ? form.outputDate[1] : "";
      }),
      { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const getList = async () => {
        console.log("ccc");
        let params = {
          billCode: form.billCode,
          billMaxMoney: form.billMaxMoney,
          billMinMoney: form.billMinMoney,
          inputName: form.inputName,
          outputName: form.outputName,
          queryType: form.queryType,
          maturityStartDate: maturityStartDate.value,
          maturityEndDate: maturityEndDate.value,
          outputStartDate: outputStartDate.value,
          outputEndDate: outputEndDate.value,
          pageNum: pageNum.value,
          pageSize: pageSize.value,
        };
        // if (!validateBillMaxMoney(params)) return;
        console.log("getList...");
      },
      resetSearch = () => {
        form.maturityDate = [];
        form.outputDate = [];
        pageSize.value = 10;
        pageNum.value = 1;
        getList();
      },
      validateBillMaxMoney = (params: any) => {
        console.log("validateBillMaxMoney");
        return true;
      },
      exportExcel = () => {
        let params: any = {
          billCode: form.billCode,
          billMaxMoney: form.billMaxMoney,
          billMinMoney: form.billMinMoney,
          inputName: form.inputName,
          outputName: form.outputName,
          queryType: form.queryType,
          maturityStartDate: maturityStartDate.value,
          maturityEndDate: maturityEndDate.value,
          outputStartDate: outputStartDate.value,
          outputEndDate: outputEndDate.value,
          pageNum: pageNum.value,
          pageSize: pageSize.value,
        };

        if (!validateBillMaxMoney(params)) return;

        for (let key in params) {
          if (params[key] === "" || params[key] === null) {
            delete params[key];
          }
        }
      };

    onBeforeMount(() => {
      console.log(props, context);
      console.log(getCurrentInstance());
      getList();
    });
    onMounted(() => {
      console.log("mounted!");
    });
    onActivated(async () => {
      getList();
    });

    return {
      hasData,
      billStatus,
      form,
      pageSize,
      pageNum,
      total,
      list,
      blockHeight,
      maturityStartDate,
      proxy,
      ...agreementMixin(),
      getList,
      resetSearch,
      exportExcel,
    };
  },
});
</script>
