<template>
  <HxcMenu>
    <base-modal v-if="isShowModal" @close="toggleModal" :submit="SubmitFilter" scrollable title="Filtrar dados">
      <div class="grid gap-3 grid-cols-1 lg:grid-cols-2 w-full">
        <div>
          <hxc-label text="Mín Negócios"></hxc-label>
          <hxc-range-input v-model:value="varTotal" :min="0" :step="10" :max="500"></hxc-range-input>
        </div>
      </div>

      <hr class="my-4 border-gray-200" />
      <template v-slot:footer>
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <hxc-btn @click="SubmitFilter" text="Confirmar"> </hxc-btn>
        </span>
      </template>
    </base-modal>

    <!-- end modal -->
    <div class="flex flex-col no-scrollbar h-full overflow-scroll min-w-full p-3">
      <div class="top-2/4 relative">
        <vue-element-loading
          v-if="!closeDelay"
          class=""
          :active="isLoading"
          width="255px"
          height="255px"
          spinner="bar-fade-scale"
          color="#01C38D"
        />
        <Banner :hasPermission="hasPermission"></Banner>
      </div>

      <div class="flex flex-row mb-1">
        <div class="min-w-48 w-full grow">
          <Multiselect
            class="dark:bg-dark-1 w-full text-black dark:text-gray-200 border border-gray-200 dark:border-dark-1"
            v-model="value2"
            :mode="'tags'"
            placeholder="Adicionar ativos"
            :filter-results="true"
            :resolve-on-load="true"
            :min-chars="1"
            :delay="1"
            :limit="5"
            :searchable="true"
            :options="
              async (query) => {
                return await fetchLanguages2(query); // check JS block in JSFiddle for implementation
              }
            "
          />
        </div>
        <div class="ml-2 grow mb-2 w-full">
          <Multiselect
            class="dark:bg-dark-1 text-black dark:text-gray-200 border border-gray-200 dark:border-dark-1"
            v-model="value"
            :mode="mode"
            placeholder="Selecione os Vencimentos..."
            :filter-results="true"
            :resolve-on-load="true"
            :min-chars="1"
            :delay="1"
            :limit="20"
            :searchable="true"
            :options="
              async (query) => {
                return await fetchLanguages(query); // check JS block in JSFiddle for implementation
              }
            "
          />
        </div>
      </div>
      <hxc-table
        :defaultSort="{ col: 'neg', dir: -1 }"
        :filterEnabled="true"
        :FilerBycolumns="FilerBycolumns"
        :intersected="intersected"
        :search="true"
        :data="equities"
        :columns="columns"
        :toggleModal="toggleModal"
        :footer="true"
        :paging="paging"
        :loading="loading"
      >
      </hxc-table>
    </div>
  </HxcMenu>
</template>

<script>
import HxcMenu from "@/components/Menu/Menu.vue";
import HxcRangeInput from "@/components/Inputs/RangeInput.vue";
import HxcInput from "@/components/Inputs/Input.vue";
import HxcBtn from "@/components/Buttons/btn.vue";

import BaseModal from "@/components/Modal/BaseModal.vue";
import HxcLabel from "@/components/Labels/Label.vue";

import HxcSelect from "@/components/Selects/Select.vue";
import HxcTable from "@/components/Tables/Table.vue";
import Navbar from "@/components/Navbar.vue";

import Multiselect from "@vueform/multiselect";

import "vue3-treeselect/dist/vue3-treeselect.css";
import Treeselect from "vue3-treeselect";
import Banner from "@/components/Modal/BannerAccesso.vue";
import { ref, defineAsyncComponent } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Navbar,
    HxcRangeInput,
    HxcTable,
    HxcSelect,
    HxcMenu,
    HxcLabel,
    HxcInput,
    HxcBtn,
    BaseModal,
    Multiselect,
    Banner,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    theme() {
      const theme = this.$store.getters.getTheme;
      theme === "light"
        ? (document.body.style["background-color"] = "#f2f4f7 ")
        : (document.body.style["background-color"] = "#2a2e39");
      return theme;
    },
    selectedTheme() {
      return this.theme === "light" ? "white-theme" : "";
    },
    cols() {
      return this.equities.length >= 1 ? Object.keys(this.equities[0]) : [];
    },
    filteredCats() {
      return this.equities.filter((c) => {
        if (this.filter == "") return true;
        return c[this.columns[0].value].toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
      });
    },
    sortedCats() {
      return this.filteredCats
        .sort((a, b) => {
          if (a[this.currentSort] < b[this.currentSort]) return -1 * this.currentSortDir;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * this.currentSortDir;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
    tableLength() {
      console.log(this.sortedCats.length);
      return this.sortedCats.length;
    },
  },

  data() {
    return {
      value: [],
      value2: [],
      paging: { pages: 0, total: 0, page: 0, page_size: 350 },
      options: [
        "2WAV3",
        "AALR3",
        "ABCB4",
        "ABEV3",
        "AERI3",
        "AESB3",
        "AESO3",
        "AFLT3",
        "AGBK11",
        "AGBK4",
        "AGRA4",
        "AGRO3",
        "AGXY3",
        "AHEB3",
        "AHEB5",
        "AHEB6",
        "ALLD3",
        "ALPA3",
        "ALPA4",
        "ALPK3",
        "ALSO3",
        "ALTF3",
        "ALUP11",
        "ALUP3",
        "ALUP4",
        "AMAR3",
        "AMBP3",
        "AMER3",
        "AMZG11",
        "AMZG3",
        "ANIM3",
        "APER3",
        "APTI3",
        "APTI4",
        "ARML3",
        "ARZZ3",
        "ASAI3",
        "ATEA3",
        "ATMP3",
        "ATOM3",
        "AVLL3",
        "AZEV3",
        "AZEV4",
        "AZUL4",
        "B3SA3",
        "BAHI3",
        "BALM3",
        "BALM4",
        "BAUH3",
        "BAUH4",
        "BAZA3",
        "BBAS11",
        "BBAS12",
        "BBAS3",
        "BBDC3",
        "BBDC4",
        "BBML3",
        "BBOV11",
        "BBRK3",
        "BBSD11",
        "BBSE3",
        "BCPS3",
        "BCPS4",
        "BDLL3",
        "BDLL4",
        "BEEF3",
        "BEES3",
        "BEES4",
        "BEGB4",
        "BFFT3",
        "BGIP3",
        "BGIP4",
        "BIDI11",
        "BIDI3",
        "BIDI4",
        "BIOM3",
        "BKBR3",
        "BLAU3",
        "BLUT3",
        "BLUT4",
        "BMEB3",
        "BMEB4",
        "BMGB4",
        "BMIN3",
        "BMIN4",
        "BMKS3",
        "BMOB3",
        "BNBR3",
        "BNRG3",
        "BOAS3",
        "BOBR3",
        "BOBR4",
        "BOVA11",
        "BOVB11",
        "BOVS11",
        "BOVV11",
        "BOVX11",
        "BPAC11",
        "BPAC3",
        "BPAC5",
        "BPAN11",
        "BPAN3",
        "BPAN4",
        "BPAR3",
        "BRAP3",
        "BRAP4",
        "BRAP99",
        "BRAX11",
        "BRBI11",
        "BRBI3",
        "BRBI4",
        "BRFS3",
        "BRGE11",
        "BRGE12",
        "BRGE3",
        "BRGE5",
        "BRGE6",
        "BRGE7",
        "BRGE8",
        "BRIT3",
        "BRIV3",
        "BRIV4",
        "BRKM3",
        "BRKM5",
        "BRKM6",
        "BRML3",
        "BRPR11",
        "BRPR3",
        "BRQB3",
        "BRSR3",
        "BRSR5",
        "BRSR6",
        "BSLI3",
        "BSLI4",
        "BVEN11",
        "BVEN3",
        "C1GT3",
        "CALI3",
        "CALI4",
        "CAMB3",
        "CAML3",
        "CARD3",
        "CASH3",
        "CASN3",
        "CASN4",
        "CATA3",
        "CATA4",
        "CBAV3",
        "CBEE3",
        "CBOH3",
        "CCAT3",
        "CCAT4",
        "CCRO3",
        "CEAB3",
        "CEAC11",
        "CEAC3",
        "CEAC4",
        "CEAG3",
        "CEAL11",
        "CEAL3",
        "CEAL4",
        "CEBD3",
        "CEBR3",
        "CEBR5",
        "CEBR6",
        "CEDO3",
        "CEDO4",
        "CEEB3",
        "CEEB5",
        "CEEB6",
        "CEED3",
        "CEED4",
        "CEEP3",
        "CEGR3",
        "CEPE3",
        "CEPE5",
        "CEPE6",
        "CERO3",
        "CESA3",
        "CESP3",
        "CESP5",
        "CESP6",
        "CFHO3",
        "CFHO4",
        "CGAS3",
        "CGAS5",
        "CGEE3",
        "CGEE4",
        "CGOS3",
        "CGRA3",
        "CGRA4",
        "CIEL3",
        "CLSA3",
        "CLSC3",
        "CLSC4",
        "CMDB11",
        "CMIG3",
        "CMIG4",
        "CMIN3",
        "CMNS3",
        "CMSA3",
        "CMSA4",
        "CNRT5",
        "CNSY3",
        "COCE3",
        "COCE5",
        "COCE6",
        "COCN5",
        "COGN3",
        "COMR3",
        "CONX3",
        "CORR3",
        "CORR4",
        "CPCH3",
        "CPCH7",
        "CPFE3",
        "CPIS11",
        "CPIS12",
        "CPIS3",
        "CPIS4",
        "CPLE11",
        "CPLE3",
        "CPLE5",
        "CPLE6",
        "CPNO7",
        "CRDE3",
        "CRFB3",
        "CRIV3",
        "CRIV4",
        "CRML4",
        "CRPC4",
        "CRPG3",
        "CRPG5",
        "CRPG6",
        "CSAB3",
        "CSAB4",
        "CSAL4",
        "CSAM3",
        "CSAM4",
        "CSAN3",
        "CSED3",
        "CSMG3",
        "CSNA3",
        "CSRN3",
        "CSRN5",
        "CSRN6",
        "CTCA3",
        "CTKA3",
        "CTKA4",
        "CTNM3",
        "CTNM4",
        "CTSA3",
        "CTSA4",
        "CURY3",
        "CVCB3",
        "CXSE3",
        "CYRE3",
        "DANA11",
        "DASA3",
        "DASS3",
        "DESK3",
        "DEXP3",
        "DEXP4",
        "DIRR3",
        "DIVO11",
        "DMMO3",
        "DMVF3",
        "DOHL3",
        "DOHL4",
        "DOTZ3",
        "DTCY3",
        "DTCY4",
        "DTEN3",
        "DTEN6",
        "DXCO3",
        "DXXI3",
        "E3XT3",
        "EALT3",
        "EALT4",
        "EBTL3",
        "ECOO11",
        "ECOR3",
        "ECPR3",
        "ECPR4",
        "EEEL3",
        "EEEL4",
        "EESG3",
        "EGCE3",
        "EGIE3",
        "EKTR3",
        "EKTR4",
        "ELBR4",
        "ELET3",
        "ELET5",
        "ELET6",
        "ELMD3",
        "EMAE3",
        "EMAE4",
        "EMBP3",
        "EMBP4",
        "EMBR3",
        "ENAC3",
        "ENAT3",
        "ENBR3",
        "ENEV3",
        "ENGI11",
        "ENGI3",
        "ENGI4",
        "ENJU3",
        "ENMT3",
        "ENMT4",
        "EPAR3",
        "EPTR4",
        "EQPA3",
        "EQPA5",
        "EQPA6",
        "EQPA7",
        "EQTL3",
        "ESGB11",
        "ESPA3",
        "ESSD3",
        "ESTR3",
        "ESTR4",
        "ETER3",
        "ETGO3",
        "ETGO4",
        "EUCA3",
        "EUCA4",
        "EVEN3",
        "EZTC3",
        "FAEL6",
        "FAEL7",
        "FESA3",
        "FESA4",
        "FHER3",
        "FIGE3",
        "FIGE4",
        "FIND11",
        "FIQE3",
        "FLEX3",
        "FLRY3",
        "FNCN3",
        "FNUV3",
        "FRAS3",
        "FRIO3",
        "FRNV3",
        "FRTA3",
        "FTRO3",
        "GENB11",
        "GENT3",
        "GEPA3",
        "GEPA4",
        "GETT11",
        "GETT3",
        "GETT4",
        "GFSA3",
        "GGBR3",
        "GGBR4",
        "GGPS3",
        "GMAT3",
        "GNDI3",
        "GOAU3",
        "GOAU4",
        "GOLL3",
        "GOLL4",
        "GOVE11",
        "GPAR3",
        "GPLA5",
        "GRAO3",
        "GRND3",
        "GSHP3",
        "GUAR3",
        "GUNI3",
        "GURU11",
        "HAGA3",
        "HAGA4",
        "HAPV3",
        "HBOR3",
        "HBRE3",
        "HBSA3",
        "HBTS3",
        "HBTS5",
        "HBTS6",
        "HCAR3",
        "HEDA3",
        "HETA3",
        "HETA4",
        "HLJP3",
        "HMOB3",
        "HOAM5",
        "HOAM6",
        "HOOT3",
        "HOOT4",
        "HYPE3",
        "IBOB11",
        "ICBR3",
        "IFCM3",
        "IGBR3",
        "IGSN3",
        "IGTI11",
        "IGTI3",
        "IGTI4",
        "INEP3",
        "INEP4",
        "INNT3",
        "INTB3",
        "IPNN3",
        "IRBR3",
        "ISUS11",
        "ITSA3",
        "ITSA4",
        "ITUB3",
        "ITUB4",
        "ITUB99",
        "IVLG3B",
        "JALL3",
        "JBSS3",
        "JCBA6",
        "JFEN3",
        "JHSF3",
        "JOPA3",
        "JOPA4",
        "JSLG3",
        "KALS5",
        "KALU3",
        "KEPL3",
        "KLAS3",
        "KLBN11",
        "KLBN3",
        "KLBN4",
        "KRSA3",
        "LAME3",
        "LAME4",
        "LAME98",
        "LAME99",
        "LAND3",
        "LAVV3",
        "LCAM3",
        "LEVE3",
        "LIGT3",
        "LIPR3",
        "LJQQ3",
        "LLBI3",
        "LLBI4",
        "LLIS3",
        "LMED3",
        "LOGG3",
        "LOGN3",
        "LOGS3",
        "LOGS4",
        "LPSB3",
        "LREN3",
        "LUPA3",
        "LUXM3",
        "LUXM4",
        "LVTC3",
        "LWSA3",
        "MAPT3",
        "MAPT4",
        "MAQN3",
        "MAQN4",
        "MATB11",
        "MATD3",
        "MBLY3",
        "MDIA3",
        "MDIN3",
        "MDNE3",
        "MDSI3",
        "MEAL3",
        "MEGA3",
        "MELK3",
        "MERC3",
        "MERC4",
        "MGEL3",
        "MGEL4",
        "MGFB3",
        "MGLU3",
        "MILS3",
        "MLAS3",
        "MMAQ3",
        "MMAQ4",
        "MMBR3",
        "MMBR4",
        "MMCA3",
        "MMCA4",
        "MMCF3",
        "MMCF4",
        "MMXM11",
        "MMXM3",
        "MNBI3",
        "MNDL3",
        "MNPR3",
        "MOAR3",
        "MODL11",
        "MODL3",
        "MODL4",
        "MOSI3",
        "MOVI3",
        "MPBH11",
        "MRFG3",
        "MRVE3",
        "MSPA3",
        "MSPA4",
        "MSRO3",
        "MTAL3",
        "MTAL6",
        "MTIG3",
        "MTIG4",
        "MTNR5",
        "MTNR7",
        "MTRE3",
        "MTSA3",
        "MTSA4",
        "MULT3",
        "MWET3",
        "MWET4",
        "MWIS6",
        "MYPK3",
        "NAII3",
        "NAII4",
        "NEMO3",
        "NEMO5",
        "NEMO6",
        "NEOE3",
        "NESB3",
        "NGRD3",
        "NINJ3",
        "NIPL3",
        "NKEP3",
        "NKEP4",
        "NODA3",
        "NODA6",
        "NOGV11",
        "NORD3",
        "NOVI3",
        "NRTQ3",
        "NTCO3",
        "NUTR3",
        "NXVL3",
        "NXVL4",
        "OBAH3",
        "OBIO3",
        "ODER3",
        "ODER4",
        "ODPV3",
        "OFSA3",
        "OIBR3",
        "OIBR4",
        "ONCO3",
        "OPCT3",
        "ORVR3",
        "OSXB3",
        "OXIT11",
        "PARD3",
        "PASS3",
        "PASS5",
        "PASS6",
        "PATI3",
        "PATI4",
        "PCAR3",
        "PCAR99",
        "PCBU3",
        "PCFV4",
        "PDGR3",
        "PDTC3",
        "PEAB3",
        "PEAB4",
        "PETR3",
        "PETR4",
        "PETZ3",
        "PFRM3",
        "PGMN3",
        "PIBB11",
        "PINE3",
        "PINE4",
        "PLAS3",
        "PLFS3",
        "PLPL3",
        "PLSP3",
        "PMAM3",
        "PNVL3",
        "POMO3",
        "POMO4",
        "PORT3",
        "POSI3",
        "POWE3",
        "PPAR3",
        "PPLA11",
        "PRIO3",
        "PRNR3",
        "PRVA3",
        "PSSA3",
        "PSVM11",
        "PTBL3",
        "PTBP4",
        "PTCA11",
        "PTCA3",
        "PTNT3",
        "PTNT4",
        "PTSL3",
        "PTSL4",
        "PUBL11",
        "QUAL3",
        "QUSW3",
        "RADL3",
        "RAIL3",
        "RAIZ4",
        "RANI3",
        "RAPT3",
        "RAPT4",
        "RBNS11",
        "RBNS3",
        "RBNS4",
        "RCSL3",
        "RCSL4",
        "RDNI3",
        "RDOR3",
        "RECV3",
        "REDE3",
        "REFC4",
        "RENT3",
        "RFAG3",
        "RHED4",
        "RHPY3",
        "RIBC8",
        "RIOS3",
        "RIVA3",
        "RJSA3",
        "RLTM11",
        "RNEW11",
        "RNEW3",
        "RNEW4",
        "RNPT4",
        "ROMI3",
        "ROOS12",
        "RPAD3",
        "RPAD5",
        "RPAD6",
        "RPMG3",
        "RRRP3",
        "RSID3",
        "RSUL3",
        "RSUL4",
        "SANB11",
        "SANB3",
        "SANB4",
        "SANB99",
        "SANY6",
        "SAPR11",
        "SAPR3",
        "SAPR4",
        "SBFG3",
        "SBSP3",
        "SCAR3",
        "SDRM3",
        "SDRM6",
        "SEER3",
        "SEQL3",
        "SGPS3",
        "SHOW3",
        "SHUL3",
        "SHUL4",
        "SILO3",
        "SILO4",
        "SIMH3",
        "SLCE3",
        "SLED3",
        "SLED4",
        "SMAB11",
        "SMAC11",
        "SMAL11",
        "SMFT3",
        "SMTO3",
        "SNSY3",
        "SNSY5",
        "SNSY6",
        "SOJA3",
        "SOMA3",
        "SOND3",
        "SOND5",
        "SOND6",
        "SPCI6",
        "SPCR3",
        "SQIA3",
        "STAL6",
        "STBP3",
        "STKF3",
        "STOK3",
        "STTR3",
        "SULA11",
        "SULA3",
        "SULA4",
        "SULG3",
        "SUZB3",
        "SVPH7",
        "SYNE3",
        "TAEE11",
        "TAEE3",
        "TAEE4",
        "TASA3",
        "TASA4",
        "TCNO3",
        "TCNO4",
        "TCQC3",
        "TCQC4",
        "TCSA3",
        "TECB11",
        "TECN3",
        "TEGA3",
        "TEKA3",
        "TEKA4",
        "TELB3",
        "TELB4",
        "TEND3",
        "TFCO4",
        "TGMA3",
        "TIMS3",
        "TKNO3",
        "TKNO4",
        "TOGA11",
        "TOTS3",
        "TPIS3",
        "TRAD3",
        "TRBR3",
        "TRBR4",
        "TREG3",
        "TRIG11",
        "TRIS3",
        "TRPL3",
        "TRPL4",
        "TTEN3",
        "TUPY3",
        "TVIT3",
        "TXRX11",
        "TXRX3",
        "TXRX4",
        "UCAS3",
        "UGPA3",
        "UNIP3",
        "UNIP5",
        "UNIP6",
        "USAT4",
        "USIM3",
        "USIM5",
        "USIM6",
        "VALE3",
        "VAMO3",
        "VBBR3",
        "VECF3",
        "VIIA3",
        "VITT3",
        "VIVA3",
        "VIVR3",
        "VIVT3",
        "VLID3",
        "VLPN3",
        "VSPT3",
        "VSPT4",
        "VULC3",
        "VVEO3",
        "WEGE3",
        "WEST3",
        "WHRL3",
        "WHRL4",
        "WIRE3",
        "WIZS3",
        "WLMM3",
        "WLMM4",
        "WNBR3",
        "XBOV11",
        "XFIX11",
        "XMAL11",
        "YDUQ3",
        "YOUC3",
      ],
      dates: [
        {
          value: "2022-06-17T03:00:00.000Z",
          label: "17/06/2022",
        },
        {
          value: "2022-07-15T03:00:00.000Z",
          label: "15/07/2022",
        },
        {
          value: "2022-08-19T03:00:00.000Z",
          label: "19/08/2022",
        },
        {
          value: "2022-09-16T03:00:00.000Z",
          label: "16/09/2022",
        },
        {
          value: "2022-10-21T03:00:00.000Z",
          label: "21/10/2022",
        },
        {
          value: "2022-11-18T03:00:00.000Z",
          label: "17/11/2022",
        },
        {
          value: "2022-12-16T03:00:00.000Z",
          label: "15/12/2022",
        },
        {
          value: "2023-01-20T03:00:00.000Z",
          label: "19/01/2023",
        },
        {
          value: "2023-02-17T03:00:00.000Z",
          label: "16/02/2023",
        },
        {
          value: "2023-03-17T03:00:00.000Z",
          label: "16/03/2023",
        },
        {
          value: "2023-04-20T03:00:00.000Z",
          label: "20/04/2023",
        },
        {
          value: "2023-05-19T03:00:00.000Z",
          label: "19/05/2023",
        },
        {
          value: "2023-06-16T03:00:00.000Z",
          label: "16/06/2023",
        },
        {
          value: "2023-07-21T03:00:00.000Z",
          label: "21/07/2023",
        },
        {
          value: "2023-08-18T03:00:00.000Z",
          label: "18/08/2023",
        },
        {
          value: "2023-09-15T03:00:00.000Z",
          label: "15/09/2023",
        },
        {
          value: "2023-10-20T03:00:00.000Z",
          label: "20/10/2023",
        },
        {
          value: "2023-11-17T03:00:00.000Z",
          label: "16/11/2023",
        },
        {
          value: "2023-12-15T03:00:00.000Z",
          label: "14/12/2023",
        },
        {
          value: "2024-01-19T03:00:00.000Z",
          label: "18/01/2024",
        },
        {
          value: "2024-02-16T03:00:00.000Z",
          label: "15/02/2024",
        },
        {
          value: "2024-03-15T03:00:00.000Z",
          label: "14/03/2024",
        },
        {
          value: "2024-04-19T03:00:00.000Z",
          label: "19/04/2024",
        },
        {
          value: "2024-05-17T03:00:00.000Z",
          label: "17/05/2024",
        },
      ],
      users: [{}],
      visualizationMobile: false,
      FilerBycolumns: [
        {
          name: "Série",
          value: "symbol",
          index: 0,
        },

        {
          name: "Ativo",
          value: "asset",
          index: 1,
        },

        {
          name: "Tipo",
          value: "type",
          index: 2,
        },

        {
          name: "Moneyness",
          value: "moneyness",
          index: 3,
        },
      ],
      columns: [
        { name: "Série", value: "symbol", total: { calcMode: "count", format: "int" } },
        { name: "Ativo", value: "asset" },
        {
          name: "Tipo",
          value: "type",
          custom_format: function (obj, value, colIndex, rowIndex) {
            if (value === "PUT") {
              return `<p class=" text-red-500">${value}</p>`;
            } else {
              return `<p class=" text-green-600">${value}</p>`;
            }
          },
        },

        {
          name: "Moneyness",
          value: "moneyness",
          desc: "ATM entre -5% e +5% do valor do ativo objeto",
        },
        { name: "Hora", value: "nexxusReceivedAt", format: "time" },
        { name: "Data Exerc.", value: "TradgEndDt", format: "dateUS" },
        { name: "Dias", value: "ExrcDays", format: "int" },
        {
          name: "Strike",
          value: "ExrcPric",
          custom_format: function (obj, value, colIndex, rowIndex) {
            return `R$ ${value?.toFixed(2)}`;
          },
        },
        {
          name: "Últ Ativo",
          value: "quotesAtivoObj",
          custom_format: function (obj, value, colIndex, rowIndex) {
            return `R$ ${value?.toFixed(2)}`;
          },
        },

        { name: "Último", value: "close" },
        {
          name: "Var. %",
          value: "changePerc",
          custom_format: function (obj, value, colIndex, rowIndex) {
            if (typeof rowIndex != "number") return value?.toFixed(2) + "%";
            if (value > 0) return `<span class=" text-green-500">${value?.toFixed(2)}%</span>`;
            else if (value < 0) return `<span class=" text-red-500">${value?.toFixed(2)}%</span>`;
            return value?.toFixed(2) + "%";
          },
        },
        // { name: 'Bid', value: 'bid' },
        // { name: 'Ask', value: 'ask' },
        // { name: 'Spread', value: 'spread', format: 'float' },
        {
          name: "Negócios",
          value: "neg",
          custom_format: function (obj, value, colIndex, rowIndex) {
            return `${value?.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;
          },
        },

        { name: "Delta", value: "delta", format: "float", total: { calcMode: "mean", format: "float" } },
        { name: "Gamma", value: "gamma", format: "float", total: { calcMode: "mean", format: "float" } },

        {
          name: "Vol. Implícita",
          value: "volImp",
          format: "percentM",
          custom_format: function (obj, value, colIndex, rowIndex) {
            if (typeof rowIndex != "number") return (value * 100)?.toFixed(2) + "%";
            if (value > 0.5) return `<span class=" text-green-500">${(value * 100)?.toFixed(2)}%</span>`;
            return (value * 100)?.toFixed(2) + "%";
          },
          total: {
            calcMode: "mean",
            format: "percent",
          },
        },
        // {
        //   name: 'Vol. Ponderada',
        //   value: 'volImpPonderada',

        //   custom_format: function (obj, value, colIndex, rowIndex) {
        //     return value.toFixed(2) + '%';
        //   },
        //   total: {
        //     calcMode: 'mean',
        //     format: 'percent',
        //   },
        // },

        {
          name: "Vol. Histórica",
          value: "volAtivo",
          format: "percent",
          desc: "Volatilidade do ativo objeto",
          total: { calcMode: "mean", format: "percent" },
        },

        {
          name: "Taxa Coberta",
          value: "taxaCoberta",
          format: "percentM",
          total: { calcMode: "mean", format: "percentM" },
        },
        {
          name: "Prot. Coberta",
          value: "protecao",
          format: "percentM",
          total: { calcMode: "mean", format: "percentM" },
        },
        { name: "Black & Scholes", value: "blackScholes", format: "float", desc: "Precificação da Opção" },
        {
          name: "Dif BS",
          value: "blackScholesReturn",
          format: "float",
          desc: "Diferença em valor do premio de mercado para o teórico B&S",
          custom_format: function (obj, value, colIndex, rowIndex) {
            if (typeof rowIndex != "number") return value?.toFixed(2);
            if (value > 0) return `<span class=" text-green-500">${value?.toFixed(2)}</span>`;
            else if (value < 0) return `<span class=" text-red-500">${value?.toFixed(2)}</span>`;
            return value?.toFixed(2);
          },
        },
      ],
      sort_asc: true,
      equities: [],
      page: 1,
      isShowModal: false,
      filter: "",
      search: null,
      currentSort: "vartotal",
      currentSortDir: -1,
      currentPage: 1,
      pageSize: 500,

      totalAberto: 0,
      totalAberto2: 0,
      titulares: 0,
      titulares2: 0,
      lancadores: 0,
      lancadores2: 0,
      varTotal: 0,
      varTotal2: 0,
      rawData: [],
      loading: true,
      // define options
    };
  },
  setup() {
    const Multiselect = defineAsyncComponent(() => import("@vueform/multiselect"));

    const store = useStore();

    const hasPermission = store.state.user.resources.hopcoes;

    const closeDelay = ref(hasPermission ? 0 : 1);

    let mode = "tags";
    if (window.innerWidth <= 768) {
      mode = "multiple";
    }

    let selected = ref([]);

    return {
      selected,
      mode,
      hasPermission,
      closeDelay,
      Multiselect,
    };
  },
  created() {
    this.getUsers2();
  },

  methods: {
    async intersected(trigger) {
      console.log("oewoweow", trigger);
      if (!this.loading && trigger) {
        console.log(this.paging.page + 1);
        this.loading = true;

        setTimeout(() => {
          const data = api.get(`open-interest/options?page=${this.paging.page + 1}&size=${this.paging.page_size}`);
          console.log("dta inserte", data);
          this.paging = data.paging;
          console.log("data data", data.data);
          this.data = [...this.data, ...data.data];
          console.log("new this data", this.data);
          this.loading = false;
        }, 1500);
      }
    },

    async fetchLanguages2(query) {
      if (!query) return this.options;
      console.log(this.options.filter((c) => c.toLowerCase().indexOf(query?.toLowerCase()) >= 0));
      return this.options
        .filter((c) => c.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        .map((item) => {
          return { value: item, label: item.toUpperCase() };
        });
    },
    fetchLanguages(query) {
      if (!query) return this.dates;
      console.log("sdsdsd", this.dates);
      console.log(
        "sadsadas",
        this.dates.filter((c) => c.toLowerCase().indexOf(query?.toLowerCase()) >= 0)
      );
      console.log(this.dates);
      console.log(
        this.dates
          .filter((c) => c.toLowerCase().indexOf(query.toLowerCase()) >= 0)
          .map((item) => {
            return {
              value: item.value,
              label: new Date(item.value).toLocaleDateString("pt-BR"),
            };
          })
      );
      return this.dates
        .filter((c) => c.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        .map((item) => {
          return {
            value: item.value,
            label: new Date(item.value).toLocaleDateString("pt-BR"),
          };
        });
    },

    SubmitFilter() {
      this.varTotal2 = this.varTotal;

      this.equities = this.rawData.filter((item) => item.neg >= Number(this.varTotal));
      this.isShowModal = false;
    },
    sort(column_index) {
      //if s == current sort, reverse

      this.currentSortDir = this.currentSortDir === 1 ? -1 : 1;

      this.currentSort = this.columns[column_index].index;

      console.log(this.currentSortDir, this.currentSort);
    },
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
    toggleSorting(column) {
      this.sort_asc = !this.sort_asc;
      this.currentSort = column;
    },

    getData(page = 1) {
      this.$api.get(`/quotes/option/screener?dates=${this.dates[0].value}&page=${page}&pageSize=250`).then(
        ({ data: response }) => {
          if (page == 1) {
            this.equities = [];
            this.rawData = [];
          } else if (response.total.skip < this.equities.length || this.equities.length < (page - 1) * 250) return;
          this.equities.push(...response.items.filter((item) => item.neg >= Number(this.varTotal)));
          this.rawData.push(...response.items);

          if (response.total.page < response.total.pages) this.getData(response.total.page + 1);
        },
        (error) => {
          console.log(error.response);
          console.log(error);
          this.$notify({
            type: "error",
            title: `Error`,
            text: error.response.data.message,
          });
        }
      );
    },
    getData2(page = 1) {
      console.log("getData2");
      this.$api
        .get(
          `/quotes/option/screener?dates=${
            this.value[0].value ? this.value.map((item) => item.value).join(",") : this.value.join(",")
          }&page=${page}&pageSize=250${this.value2[0] ? `&assets=${this.value2.map((item) => item).join(",")}` : ""}`
        )
        .then(
          ({ data: response }) => {
            if (page == 1) {
              this.equities = [];
              this.rawData = [];
            } else if (response.total.skip < this.equities.length || this.equities.length < (page - 1) * 250) return;
            this.equities.push(...response.items.filter((item) => item.neg >= Number(this.varTotal)));
            this.rawData.push(...response.items);

            if (response.total.page < response.total.pages) this.getData2(response.total.page + 1);
            else this.equities = this.rawData.filter((item) => item.neg >= Number(this.varTotal));
          },
          (error) => {
            console.log(error.response);
            console.log(error);
            this.$notify({
              type: "error",
              title: `Error`,
              text: error.response.data.message,
            });
          }
        );
    },
    getData3(page = 1) {
      console.log("getData3");
      this.$api
        .get(
          `/quotes/option/screener?dates=${
            this.value[0].value ? this.value.map((item) => item.value).join(",") : this.value.join(",")
          }&page=${page}&pageSize=250&assets=${this.value2.map((item) => item).join(",")}`
        )
        .then(
          ({ data: response }) => {
            if (page == 1) {
              this.equities = [];
              this.rawData = [];
            } else if (response.total.skip < this.equities.length || this.equities.length < (page - 1) * 250) return;
            this.equities.push(...response.items.filter((item) => item.neg >= Number(this.varTotal)));
            this.rawData.push(...response.items);

            if (response.total.page < response.total.pages) this.getData3(response.total.page + 1);
            else this.equities = this.rawData.filter((item) => item.neg >= Number(this.varTotal));
          },
          (error) => {
            console.log(error.response);
            console.log(error);
            this.$notify({
              type: "error",
              title: `Error`,
              text: error.response.data.message,
            });
          }
        );
    },
    getUsers2() {
      this.$api.get("/quotes/option/dates").then(
        (response) => {
          this.dates = response.data.map((item) => {
            return {
              value: item,
              label: new Date(item).toLocaleDateString("pt-BR"),
            };
          });
          this.value = [this.dates[0].value];

          this.getData();
          this.loading = false;
        },
        (error) => {
          console.log(error.response);
          console.log(error);
          this.$notify({
            type: "error",
            title: `Error`,
            text: error.response.data.message,
          });
        }
      );
    },
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue && newValue && newValue[0] && oldValue) {
        this.equities = [];
        this.getData2();
      } else if (!newValue[0] && oldValue) {
        this.value = [this.dates[0]];
      }
    },
    value2(newValue, oldValue) {
      if (newValue !== oldValue && newValue && newValue[0] && oldValue) {
        this.equities = [];
        this.getData3();
      }
    },
  },
};
</script>

<style>
.multiselect {
  align-items: center;
  background: var(--ms-bg, #fff);

  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-size: var(--ms-font-size, 1rem);
  justify-content: flex-end;
  margin: 0 auto;
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) * var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) *
      2
  );
  outline: none;
  position: relative;
  width: 100%;
}
.multiselect.is-open {
  border-radius: var(--ms-radius, 4px) var(--ms-radius, 4px) 0 0;
}
.multiselect.is-open-top {
  border-radius: 0 0 var(--ms-radius, 4px) var(--ms-radius, 4px);
}
.multiselect.is-disabled {
  background: var(--ms-bg-disabled, #f3f4f6);
  cursor: default;
}
.multiselect.is-active {
  box-shadow: 0 0 0 var(--ms-ring-width, 3px) var(--ms-ring-color, rgba(16, 185, 129, 0.188));
}
.multiselect-wrapper {
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) * var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) *
      2
  );
  outline: none;
  position: relative;
  width: 100%;
}
.multiselect-multiple-label,
.multiselect-placeholder,
.multiselect-single-label {
  align-items: center;
  background: transparent;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  left: 0;
  line-height: var(--ms-line-height, 1.375);
  max-width: 100%;
  padding-left: var(--ms-px, 0.875rem);
  padding-right: calc(1.25rem + var(--ms-px, 0.875rem) * 3);
  pointer-events: none;
  position: absolute;
  top: 0;
}
.multiselect-placeholder {
  color: var(--ms-placeholder-color, #9ca3af);
}
.multiselect-single-label-text {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.multiselect-search {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: var(--ms-bg, #fff);
  border: 0;
  border-radius: var(--ms-radius, 4px);
  bottom: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  height: 100%;
  left: 0;
  outline: none;
  padding-left: var(--ms-px, 0.875rem);
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}
.multiselect-search::-webkit-search-cancel-button,
.multiselect-search::-webkit-search-decoration,
.multiselect-search::-webkit-search-results-button,
.multiselect-search::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
.multiselect-tags {
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
}
.multiselect-tag {
  align-items: center;
  background: var(--ms-tag-bg, #10b981);
  border-radius: var(--ms-tag-radius, 4px);
  color: var(--ms-tag-color, #fff);
  display: flex;
  font-size: var(--ms-tag-font-size, 0.875rem);
  font-weight: var(--ms-tag-font-weight, 600);
  line-height: var(--ms-tag-line-height, 1.25rem);
  margin-bottom: var(--ms-tag-my, 0.25rem);
  margin-right: var(--ms-tag-mx, 0.25rem);
  padding: var(--ms-tag-py, 0.125rem) 0 var(--ms-tag-py, 0.125rem) var(--ms-tag-px, 0.5rem);
  white-space: nowrap;
}
.multiselect-tag.is-disabled {
  background: var(--ms-tag-bg-disabled, #9ca3af);
  color: var(--ms-tag-color-disabled, #fff);
  padding-right: var(--ms-tag-px, 0.5rem);
}
.multiselect-tag-remove {
  align-items: center;
  border-radius: var(--ms-tag-remove-radius, 4px);
  display: flex;
  justify-content: center;
  margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.125rem);
  padding: var(--ms-tag-remove-py, 0.25rem) var(--ms-tag-remove-px, 0.25rem);
}
.multiselect-tag-remove:hover {
  background: rgba(0, 0, 0, 0.063);
}
.multiselect-tag-remove-icon {
  background-color: currentColor;
  display: inline-block;
  height: 0.75rem;
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E");
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  opacity: 0.8;
  width: 0.75rem;
}
.multiselect-tags-search-wrapper {
  display: inline-block;
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  margin: 0 var(--ms-tag-mx, 4px) var(--ms-tag-my, 4px);
  position: relative;
}
.multiselect-tags-search-copy {
  display: inline-block;
  height: 1px;
  visibility: hidden;
  white-space: pre-wrap;
  width: 100%;
}
.multiselect-tags-search {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  bottom: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  left: 0;
  outline: none;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  background: transparent !important;
}
.multiselect-tags-search::-webkit-search-cancel-button,
.multiselect-tags-search::-webkit-search-decoration,
.multiselect-tags-search::-webkit-search-results-button,
.multiselect-tags-search::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
.multiselect-inifite {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) * var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) *
      2
  );
  width: 100%;
}
.multiselect-inifite-spinner,
.multiselect-spinner {
  animation: multiselect-spin 1s linear infinite;
  background-color: var(--ms-spinner-color, #10b981);
  flex-grow: 0;
  flex-shrink: 0;
  height: 1rem;
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 512 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m456.433 371.72-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 512 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m456.433 371.72-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z'/%3E%3C/svg%3E");
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 1rem;
  z-index: 10;
}
.multiselect-spinner {
  margin: 0 var(--ms-px, 0.875rem) 0 0;
}
.multiselect-clear {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  opacity: 1;
  padding: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  transition: 0.3s;
  z-index: 10;
}
.multiselect-clear:hover .multiselect-clear-icon {
  background-color: var(--ms-clear-color-hover, #000);
}
.multiselect-clear-icon {
  background-color: var(--ms-clear-color, #999);
  display: inline-block;
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E");
  transition: 0.3s;
}
.multiselect-caret,
.multiselect-clear-icon {
  height: 1.125rem;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 0.625rem;
}
.multiselect-caret {
  background-color: var(--ms-caret-color, #999);
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'/%3E%3C/svg%3E");
  pointer-events: none;
  position: relative;
  transform: rotate(0deg);
  transition: transform 0.3s;
  z-index: 10;
}
.multiselect-caret.is-open {
  pointer-events: auto;
  transform: rotate(180deg);
}
.multiselect-dropdown {
  -webkit-overflow-scrolling: touch;
  color: #fff;
  background: rgba(44, 46, 48, 0.8);
  border: var(--ms-dropdown-border-width, 1px) solid rgba(44, 46, 48, 0.8);
  border-radius: 0 0 var(--ms-dropdown-radius, 4px) var(--ms-dropdown-radius, 4px);
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: calc(var(--ms-border-width, 1px) * -1);
  margin-top: calc(var(--ms-border-width, 1px) * -1);
  max-height: 15rem;
  max-height: var(--ms-max-height, 10rem);
  outline: none;
  overflow-y: scroll;
  position: absolute;
  right: calc(var(--ms-border-width, 1px) * -1);
  transform: translateY(100%);
  z-index: 100;
}
.multiselect-dropdown.is-top {
  border-radius: var(--ms-dropdown-radius, 4px) var(--ms-dropdown-radius, 4px) 0 0;
  bottom: auto;
  top: var(--ms-border-width, 1px);
  transform: translateY(-100%);
}
.multiselect-dropdown.is-hidden {
  display: none;
}
.multiselect-options {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}
.multiselect-group {
  margin: 0;
  padding: 0;
}
.multiselect-group-label {
  align-items: center;
  background: var(--ms-group-label-bg, #e5e7eb);
  box-sizing: border-box;
  color: var(--ms-group-label-color, #374151);
  cursor: default;
  display: flex;
  font-size: 0.875rem;
  font-weight: 600;
  justify-content: flex-start;
  line-height: var(--ms-group-label-line-height, 1.375);
  padding: var(--ms-group-label-py, 0.3rem) var(--ms-group-label-px, 0.75rem);
  text-align: left;
  text-decoration: none;
}
.multiselect-group-label.is-pointable {
  cursor: pointer;
}
.multiselect-group-label.is-pointed {
  background: var(--ms-group-label-bg-pointed, #d1d5db);
  color: var(--ms-group-label-color-pointed, #374151);
}
.multiselect-group-label.is-selected {
  background: var(--ms-group-label-bg-selected, #059669);
  color: var(--ms-group-label-color-selected, #fff);
}
.multiselect-group-label.is-disabled {
  background: var(--ms-group-label-bg-disabled, #f3f4f6);
  color: var(--ms-group-label-color-disabled, #d1d5db);
  cursor: not-allowed;
}
.multiselect-group-label.is-selected.is-pointed {
  background: var(--ms-group-label-bg-selected-pointed, #0c9e70);
  color: var(--ms-group-label-color-selected-pointed, #fff);
}
.multiselect-group-label.is-selected.is-disabled {
  background: var(--ms-group-label-bg-selected-disabled, #75cfb1);
  color: var(--ms-group-label-color-selected-disabled, #d1fae5);
}
.multiselect-group-options {
  margin: 0;
  padding: 0;
}
.multiselect-option {
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-size: var(--ms-option-font-size, 1rem);
  justify-content: flex-start;
  line-height: var(--ms-option-line-height, 1.375);
  padding: var(--ms-option-py, 0.5rem) var(--ms-option-px, 0.75rem);
  text-align: left;
  text-decoration: none;
}
.multiselect-option.is-pointed {
  background: rgba(12, 157, 111, 0.8);
  color: var(--ms-option-color-pointed, #ffffff);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #10b981);
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-disabled {
  background: var(--ms-option-bg-disabled, #fff);
  color: var(--ms-option-color-disabled, #d1d5db);
  cursor: not-allowed;
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #26c08e);
  color: var(--ms-option-color-selected-pointed, #fff);
}
.multiselect-option.is-selected.is-disabled {
  background: var(--ms-option-bg-selected-disabled, #87dcc0);
  color: var(--ms-option-color-selected-disabled, #d1fae5);
}
.multiselect-no-options,
.multiselect-no-results {
  color: var(--ms-empty-color, #4b5563);
  padding: var(--ms-option-py, 0.5rem) var(--ms-option-px, 0.75rem);
}
.multiselect-fake-input {
  background: transparent;
  border: 0;
  bottom: -1px;
  font-size: 0;
  height: 1px;
  left: 0;
  outline: none;
  padding: 0;
  position: absolute;
  right: 0;
  width: 100%;
}
.multiselect-fake-input:active,
.multiselect-fake-input:focus {
  outline: none;
}
.multiselect-assistive-text {
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
}
.multiselect-spacer {
  display: none;
}
[dir="rtl"] .multiselect-multiple-label,
[dir="rtl"] .multiselect-placeholder,
[dir="rtl"] .multiselect-single-label {
  left: auto;
  padding-left: calc(1.25rem + var(--ms-px, 0.875rem) * 3);
  padding-right: var(--ms-px, 0.875rem);
  right: 0;
}
[dir="rtl"] .multiselect-search {
  padding-left: 0;
  padding-right: var(--ms-px, 0.875rem);
}
[dir="rtl"] .multiselect-tags {
  padding-left: 0;
  padding-right: var(--ms-py, 0.5rem);
}
[dir="rtl"] .multiselect-tag {
  margin-left: var(--ms-tag-mx, 0.25rem);
  margin-right: 0;
  padding: var(--ms-tag-py, 0.125rem) var(--ms-tag-px, 0.5rem) var(--ms-tag-py, 0.125rem) 0;
}
[dir="rtl"] .multiselect-tag.is-disabled {
  padding-left: var(--ms-tag-px, 0.5rem);
}
[dir="rtl"] .multiselect-caret,
[dir="rtl"] .multiselect-spinner {
  margin: 0 0 0 var(--ms-px, 0.875rem);
}
[dir="rtl"] .multiselect-clear {
  padding: 0 0 0 var(--ms-px, 0.875rem);
}
@keyframes multiselect-spin {
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>

<style scoped>
/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.multiselect-tags-search {
  background: transparent !important;
}
</style>
