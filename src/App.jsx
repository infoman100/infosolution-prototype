import React, { useMemo, useState } from "react";
import {
  Monitor,
  Smartphone,
  Building2,
  LayoutDashboard,
  Factory,
  Cpu,
  ClipboardList,
  LogIn,
  Search,
  Plus,
  Download,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  UserRound,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react";

const company = {
  name: "INFO SOLUTION",
  koreanName: "주식회사 인포솔루션",
  ceo: "신만재",
  founded: "2002년 03월 01일",
  address: "경기도 안산시 단원구 신길동 1229 리드 스마트스퀘어 1367호 ~ 1369호",
  phone: "031-346-3700",
  fax: "031-346-3701",
  email: "pmo@infosolution.co.kr",
  message: "제조 현장을 이해하고 운영까지 책임지는 IT 파트너",
  description:
    "인포솔루션은 제조업에 특화된 ERP, MES, POP, WMS, SPC, MPS/MRP, CMMS 솔루션을 기반으로 표준 프로세스 수립, 현장 데이터 연결, 오픈 안정화와 운영 고도화까지 함께합니다.",
  products: [
    "FLEX ERP Enterprise",
    "FLEX MES (Manufacturing)",
    "FLEX Planning (MPS/MRP)",
    "WMS for Android",
    "FLEX CMMS",
    "FLEX PMS",
  ],
};

const mainSolutions = [
  {
    code: "ERP",
    title: "통합 경영관리",
    desc: "인사·회계·원가·구매·영업까지 전사 자원을 단일 시스템으로 통합 관리합니다.",
    tags: ["재무/관리회계", "구매/영업", "인사/급여"],
    icon: LayoutDashboard,
  },
  {
    code: "MES",
    title: "제조 실행 시스템",
    desc: "작업지시·실적·재공·품질을 실시간 수집하여 공장 가시성과 통제력을 확보합니다.",
    tags: ["실적/재공", "로트/추적", "설비 인터페이스"],
    icon: Factory,
  },
  {
    code: "POP",
    title: "현장 정보 시스템",
    desc: "작업자·설비·바코드 단말로 현장의 이벤트를 즉시 수집·전송합니다.",
    tags: ["HMI/터치 단말", "바코드/RFID", "설비 PLC 연계"],
    icon: Monitor,
  },
  {
    code: "WMS",
    title: "창고/물류 관리",
    desc: "입출고·재고·로케이션·피킹까지 물류 흐름을 데이터 모델로 관리합니다.",
    tags: ["입출고/재고", "로케이션", "SCM 연계"],
    icon: ClipboardList,
  },
  {
    code: "SPC",
    title: "통계적 공정관리",
    desc: "관리도·공정능력 분석으로 품질 변동을 사전에 탐지하고 개선 포인트를 찾습니다.",
    tags: ["X-bar/R 관리도", "Cp/Cpk", "이상 알림"],
    icon: Cpu,
  },
  {
    code: "MPS/MRP",
    title: "생산계획 / 자재소요",
    desc: "수요·생산·자재를 동기화하여 결품과 과잉 없이 안정적인 납기를 달성합니다.",
    tags: ["판매계획 연계", "BOM/Routing", "능력 시뮬레이션"],
    icon: ClipboardList,
  },
  {
    code: "CMMS",
    title: "설비 보전 관리",
    desc: "예방·예지보전 계획으로 설비 가동률을 높이고 비계획 정지를 줄입니다.",
    tags: ["점검/이력", "예방보전", "스페어 관리"],
    icon: Cpu,
  },
  {
    code: "Consulting",
    title: "스마트팩토리 컨설팅",
    desc: "현황 진단·요건 정의·로드맵·변화관리까지 도입 성공률을 높이는 컨설팅을 제공합니다.",
    tags: ["AS-IS/TO-BE", "마스터플랜", "변화관리"],
    icon: Building2,
  },
  {
    code: "Operation",
    title: "운영 · 고도화",
    desc: "릴리스 후 안정화 지원, 사용자 교육, 지속적인 고도화로 ROI를 장기간 유지합니다.",
    tags: ["안정화 지원", "고도화 로드맵", "24/7 운영"],
    icon: CheckCircle2,
  },
];

const businessDomains = [
  { code: "ERP", title: "통합 경영관리", desc: "전사 기준정보와 경영 데이터를 통합합니다." },
  { code: "MES", title: "제조 실행", desc: "작업지시부터 실적·품질까지 현장을 연결합니다." },
  { code: "PLM", title: "제품정보 관리", desc: "제품 개발 전 과정의 정보를 표준화합니다." },
  { code: "WMS", title: "창고/물류", desc: "재고와 물류 흐름을 실시간으로 추적합니다." },
  { code: "CMMS", title: "설비 보전", desc: "설비 점검과 보전 이력을 체계화합니다." },
];

const solutionDetails = {
  mes: {
    code: "MES",
    title: "제조 실행 시스템",
    subtitle: "현장 작업과 실적 데이터를 실시간으로 연결하는 제조 운영 플랫폼",
    summary:
      "MES는 작업지시, 실적, 재공, 품질, 설비 이벤트를 실시간으로 수집하여 현장의 상태를 투명하게 보여주고, 공정 흐름을 표준화합니다.",
    flow: ["작업지시", "현장실적", "공정진행", "품질확인", "실시간 모니터링"],
    benefits: ["공정 데이터 실시간 확보", "재공·LOT 추적성 강화", "현장 이상 대응 속도 향상"],
    images: ["MES POP 화면 1", "MES POP 화면 2", "MES POP 화면 3"],
  },
  mobile: {
    code: "Mobile",
    title: "Mobile / WMS",
    subtitle: "PDA와 바코드 기반으로 입출고·재고·LOT 이력을 현장에서 처리",
    summary:
      "모바일 WMS는 현장 작업자가 PDA와 바코드 리더를 활용해 자재 입출고, LOT 확인, 재고 반영을 즉시 처리하도록 지원합니다.",
    flow: ["바코드 스캔", "LOT 확인", "입출고 처리", "재고 반영", "이력 추적"],
    benefits: ["수기 입력 최소화", "재고 정확도 향상", "현장 처리 속도 개선"],
    images: ["WMS PDA 사용 이미지", "PDA 처리 흐름 이미지"],
  },
  erp: {
    code: "ERP",
    title: "FLEX ERP",
    subtitle: "제조 기준정보와 영업·구매·생산·회계 흐름을 통합하는 ERP",
    summary:
      "FLEX ERP는 FCM, SCM, MFG 영역을 중심으로 제조기업의 수불, 비용, 생산, 품질, 외주 흐름을 하나의 프로세스로 연결합니다.",
    flow: ["기준정보", "영업/구매", "생산/품질", "수불/원가", "회계/경영정보"],
    benefits: ["업무 표준화", "수불·비용 통합관리", "경영 의사결정 데이터 확보"],
    images: [],
  },
};

const csrRows = [
  {
    id: "260325-010",
    company: "시노펙스(베트남)",
    title: "본사에서 베트남 SMT MES 접속 불가의 건",
    type: "오류확인",
    work: "시스템관리",
    status: "완료",
    priority: "상",
    requestDate: "2026-03-25",
    requester: "tien.tm",
    manager: "전원태",
    md: "0 / 0",
    due: "",
    done: "2026-03-25",
  },
  {
    id: "260312-002",
    company: "시노펙스(베트남)",
    title: "routing 관련 문의",
    type: "문의",
    work: "생산관리",
    status: "처리중",
    priority: "상",
    requestDate: "2026-03-12",
    requester: "이용준",
    manager: "안상현",
    md: "0 / 0",
    due: "",
    done: "",
  },
  {
    id: "260121-018",
    company: "시노펙스(베트남)",
    title: "Source code of MES read data program",
    type: "데이터수정",
    work: "MES",
    status: "검수요청",
    priority: "긴급",
    requestDate: "2026-01-21",
    requester: "tien.tm",
    manager: "전용호",
    md: "0 / 0",
    due: "",
    done: "",
  },
];

const customerCreateFields = [
  ["잔여공수(M/D)", "-0.3", "readonly"],
  ["요청번호", "260522-012", "readonly"],
  ["회사명", "시노펙스(베트남)", "readonly"],
  ["요청부서", "-", "readonly"],
  ["연락처", "0861751123", "readonly"],
  ["요청구분", "선택", "select"],
  ["화면명", "", "input"],
  ["제목", "", "input"],
  ["우선순위", "선택", "select"],
  ["보안요청", "사내 비공개 요청", "checkbox"],
  ["요청일자", "2026-05-22", "readonly"],
  ["사업부", "FPCB", "select"],
  ["요청자", "김병준", "readonly"],
  ["이메일", "andrew324600@synopex.com", "readonly"],
  ["업무구분", "선택", "select"],
  ["화면ID", "", "input"],
];

const statusColor = {
  접수대기: "bg-slate-100 text-slate-700",
  접수완료: "bg-blue-100 text-blue-700",
  처리중: "bg-amber-100 text-amber-700",
  검수요청: "bg-violet-100 text-violet-700",
  완료: "bg-emerald-100 text-emerald-700",
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Button({ children, active, variant = "default", className = "", ...props }) {
  const variants = {
    default: active ? "bg-blue-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200",
    dark: active ? "bg-slate-950 text-white" : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };
  return (
    <button
      className={cx("inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-black transition", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

function Badge({ children, className = "" }) {
  return <span className={cx("inline-flex rounded-full px-2.5 py-1 text-xs font-black", className)}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={cx("rounded-[1.6rem] border border-slate-200 bg-white shadow-sm", className)}>{children}</div>;
}

function Header({ variant }) {
  const [open, setOpen] = useState(false);
  const modern = variant === "b";
  const nav = ["회사소개", "솔루션", "고객지원", "기술지원", "인재채용"];
  return (
    <header className={cx("sticky top-0 z-50 border-b backdrop-blur", modern ? "border-white/10 bg-slate-950/80 text-white" : "border-slate-200 bg-white/90 text-slate-950")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">IS</div>
          <div>
            <div className="text-base font-black leading-none">INFO SOLUTION</div>
            <div className={cx("text-[11px] font-semibold", modern ? "text-cyan-200" : "text-slate-500")}>Manufacturing IT Partner</div>
          </div>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a key={item} href="#" className={cx("text-sm font-black", modern ? "text-slate-200 hover:text-cyan-300" : "text-slate-700 hover:text-blue-600")}>{item}</a>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className={cx("border-t px-4 py-3 md:hidden", modern ? "border-white/10 bg-slate-950" : "border-slate-200 bg-white")}>
          {nav.map((item) => <a key={item} href="#" className="block rounded-xl px-3 py-3 text-sm font-black">{item}</a>)}
        </div>
      )}
    </header>
  );
}

function DemoShell() {
  const [variant, setVariant] = useState("b");
  const [mode, setMode] = useState("prototype");
  const [page, setPage] = useState("home");
  const pages = [
    ["home", "메인"],
    ["company", "회사소개"],
    ["business", "사업영역"],
    ["solutions", "솔루션"],
    ["mes", "MES"],
    ["mobile", "Mobile"],
    ["erp", "ERP"],
    ["infoplus", "INFOPLUS"],
    ["csrCustomer", "고객 CSR"],
    ["csrAdmin", "관리자 CSR"],
    ["csrCreate", "요청등록"],
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">INFO SOLUTION RENEWAL DEMO</p>
            <h1 className="text-lg font-black">A/B안 · 프로토타입/개발형 비교 데모</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button active={variant === "a"} onClick={() => setVariant("a")} variant="dark">A안 기존 개선형</Button>
            <Button active={variant === "b"} onClick={() => setVariant("b")} variant="dark">B안 React 현대화형</Button>
            <Button active={mode === "prototype"} onClick={() => setMode("prototype")}>프로토타입</Button>
            <Button active={mode === "production"} onClick={() => setMode("production")}>개발형</Button>
          </div>
        </div>
        <div className="mx-auto mt-3 flex max-w-7xl gap-2 overflow-x-auto pb-1">
          {pages.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={cx("whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-black transition", page === key ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <Header variant={variant} />
      <main>
        {page === "home" && <HomePage variant={variant} mode={mode} setPage={setPage} />}
        {page === "company" && <CompanyPage variant={variant} />}
        {page === "business" && <BusinessPage variant={variant} setPage={setPage} />}
        {page === "solutions" && <SolutionsPage variant={variant} setPage={setPage} />}
        {page === "mes" && <SolutionDetail variant={variant} detail={solutionDetails.mes} />}
        {page === "mobile" && <SolutionDetail variant={variant} detail={solutionDetails.mobile} />}
        {page === "erp" && <SolutionDetail variant={variant} detail={solutionDetails.erp} />}
        {page === "infoplus" && <InfoPlusPage variant={variant} setPage={setPage} />}
        {page === "csrCustomer" && <CsrListPage role="customer" variant={variant} setPage={setPage} />}
        {page === "csrAdmin" && <CsrListPage role="admin" variant={variant} setPage={setPage} />}
        {page === "csrCreate" && <CsrCreatePage variant={variant} />}
      </main>
      <Footer />
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc, align = "center" }) {
  return (
    <div className={cx("mb-10", align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
      <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-blue-600">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
      {desc && <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{desc}</p>}
    </div>
  );
}

function PrototypeAHome({ setPage }) {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-black text-blue-700">A안 · 기존 구조 개선형 프로토타입</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-5xl">
              기존 홈페이지 구조는 유지하고<br />가독성과 모바일 대응을 개선합니다
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              현재 홈페이지의 메뉴 체계와 콘텐츠 흐름은 유지하되, 오래된 배너·표·좌측 메뉴·도식 스타일을 정리하여 안정적으로 개선하는 방향입니다.
            </p>
            <div className="mt-8 flex gap-3">
              <Button variant="primary" onClick={() => setPage("solutions")}>솔루션 보기</Button>
              <Button onClick={() => setPage("company")}>회사소개</Button>
            </div>
          </div>
          <Card className="overflow-hidden">
            <div className="bg-blue-700 px-6 py-4 text-xl font-black text-white">Flexible Solutions</div>
            <div className="grid gap-0 md:grid-cols-[1fr_180px]">
              <div className="flex min-h-[260px] items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-8 text-center">
                <div>
                  <p className="text-3xl font-black text-blue-900">provider for business success</p>
                  <p className="mt-4 text-slate-600">ERP · MES · WMS · CMMS · PLM</p>
                </div>
              </div>
              <div className="bg-blue-800 p-5 text-white">
                <p className="font-black">고객지원 견적문의</p>
                <p className="mt-2 text-sm text-blue-100">연락처를 남겨 주시면 담당자가 안내드립니다.</p>
                <div className="mt-5 space-y-2">
                  <div className="h-9 rounded bg-white/90" />
                  <div className="h-9 rounded bg-white/90" />
                  <Button className="mt-2 w-full bg-white text-blue-700">확인</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {["공지사항", "서비스", "사업영역"].map((title, idx) => (
            <Card key={title} className="p-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-xl font-black">{title}</h3>
                <span className="rounded bg-slate-100 px-2 py-1 text-sm font-black text-slate-500">+</span>
              </div>
              <div className="mt-6 flex min-h-[120px] items-center justify-center rounded-2xl bg-slate-50 text-center text-slate-500">
                {idx === 1 ? "솔루션 · 자료실 · 오시는길" : idx === 2 ? "ERP, MES, POP, WMS, SPC, MPS/MRP, CMMS" : "공지 리스트 영역"}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function PrototypeBHome({ setPage }) {
  return (
    <div className="overflow-hidden bg-slate-950 text-white">
      <section className="relative px-4 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.45),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.25),transparent_24%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <Badge className="bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/20">B안 · React 모션형 프로토타입</Badge>
            <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              제조 데이터를<br />하나의 운영 경험으로
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              회사 홍보 홈페이지와 INFOPLUS/CSR 고객지원 경험을 함께 현대화하는 확장형 리뉴얼 방향입니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" className="h-12 px-6" onClick={() => setPage("business")}>사업영역 맵 보기 <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button className="h-12 border-white/10 bg-white/10 px-6 text-white hover:bg-white/15" onClick={() => setPage("csrCustomer")}>CSR 포털 보기</Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />
            <Card className="relative border-white/10 bg-white/10 p-4 text-white shadow-2xl backdrop-blur">
              <div className="rounded-[1.2rem] bg-slate-900 p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-cyan-300">INFOPLUS Command Center</p>
                    <p className="mt-1 text-2xl font-black">Real-time CSR</p>
                  </div>
                  <LayoutDashboard className="h-9 w-9 text-cyan-300" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[["진행중", "17"], ["검수요청", "1,984"], ["완료", "6,690"], ["SLA", "98%"]].map(([k, v]) => (
                    <div key={k} className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-slate-400">{k}</p>
                      <p className="mt-2 text-3xl font-black">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-gradient-to-r from-blue-600/40 to-cyan-400/20 p-4">
                  <p className="text-sm font-black">요청등록 → 처리 → 검수요청 → 완료</p>
                  <div className="mt-4 flex gap-2">
                    {[1, 2, 3, 4].map((n) => <div key={n} className="h-2 flex-1 rounded-full bg-cyan-300/70" />)}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <section className="bg-white px-4 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="MODERN COMPONENTS" title="컴포넌트형 솔루션 카드" desc="React 기반으로 솔루션, 고객지원, 사업영역을 재사용 가능한 카드와 섹션으로 구성합니다." />
          <SolutionGrid variant="b" setPage={setPage} />
        </div>
      </section>
    </div>
  );
}

function HomePage({ variant, mode, setPage }) {
  if (mode === "prototype" && variant === "a") return <PrototypeAHome setPage={setPage} />;
  if (mode === "prototype" && variant === "b") return <PrototypeBHome setPage={setPage} />;
  const modern = variant === "b";
  return (
    <div>
      <section className={cx("overflow-hidden px-4 py-20 md:py-28", modern ? "bg-slate-950 text-white" : "bg-white text-slate-950")}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Badge className={modern ? "bg-cyan-400/15 text-cyan-200" : "bg-blue-100 text-blue-700"}>{mode === "prototype" ? "Prototype" : "Production-ready"} · {variant === "a" ? "A안" : "B안"}</Badge>
            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">{company.message}</h1>
            <p className={cx("mt-6 max-w-2xl text-lg leading-8", modern ? "text-slate-300" : "text-slate-600")}>{company.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" className="h-12 px-6" onClick={() => setPage("solutions")}>솔루션 보기 <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button className={modern ? "border-white/10 bg-white/10 text-white hover:bg-white/15" : ""} onClick={() => setPage("infoplus")}>INFOPLUS 고객지원</Button>
            </div>
          </div>
          <Card className={cx("p-5", modern ? "border-white/10 bg-white/10 text-white" : "")}> 
            <div className={cx("rounded-[1.2rem] p-6", modern ? "bg-slate-900" : "bg-slate-50")}>
              <p className="text-sm font-black text-blue-500">Manufacturing Operation Map</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {businessDomains.map((item) => (
                  <div key={item.code} className={cx("rounded-2xl p-4", modern ? "bg-white/10" : "bg-white border border-slate-200")}>
                    <p className="text-xl font-black text-blue-500">{item.code}</p>
                    <p className="mt-1 font-black">{item.title}</p>
                    <p className={cx("mt-2 text-xs leading-5", modern ? "text-slate-300" : "text-slate-500")}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="SOLUTIONS" title="제조 운영을 연결하는 통합 솔루션" desc="메인에서는 솔루션 범위를 요약 카드로 보여주고, 각 카드는 상세 페이지로 연결합니다." />
          <SolutionGrid variant={variant} setPage={setPage} />
        </div>
      </section>
      <section className="bg-blue-50 px-4 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <SectionTitle align="left" eyebrow="INFOPLUS / CSR" title="기존 고객을 위한 요청 처리 포털" desc="요청 등록, 처리 현황, 답변 이력을 INFOPLUS에서 확인할 수 있도록 고객지원 경험을 현대화합니다." />
            <div className="flex gap-3">
              <Button variant="primary" onClick={() => setPage("csrCustomer")}>고객 CSR 보기</Button>
              <Button onClick={() => setPage("csrAdmin")}>관리자 CSR 보기</Button>
            </div>
          </div>
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-3">
              {["요청등록", "상세보기", "댓글/Reply", "진행상태"].map((item) => <div key={item} className="rounded-2xl bg-slate-50 p-4 font-black">{item}</div>)}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function SolutionGrid({ variant, setPage }) {
  const modern = variant === "b";
  const navMap = { ERP: "erp", MES: "mes", WMS: "mobile" };
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {mainSolutions.map((item) => {
        const Icon = item.icon;
        const page = navMap[item.code] || "solutions";
        return (
          <button key={item.code} onClick={() => setPage(page)} className="group text-left">
            <Card className={cx("h-full p-7 transition hover:-translate-y-1 hover:shadow-xl", modern ? "hover:border-blue-300" : "")}> 
              <div className="mb-8 flex items-start justify-between">
                <Badge className="bg-blue-100 text-blue-700">{item.code}</Badge>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
              </div>
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="mt-4 min-h-[56px] text-sm leading-7 text-slate-600">{item.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{tag}</span>)}
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}

function CompanyPage({ variant }) {
  const modern = variant === "b";

  if (!modern) {
    return (
      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block">
            <Card className="overflow-hidden">
              <div className="bg-blue-700 px-5 py-4 text-xl font-black text-white">회사소개</div>
              {['회사개요', '회사연혁', '사업영역', '조직구성', '오시는길'].map((item, idx) => (
                <div key={item} className={cx('border-b px-5 py-4 text-sm font-black', idx === 0 ? 'bg-blue-50 text-blue-700' : 'bg-white text-slate-600')}>{item}</div>
              ))}
            </Card>
          </aside>
          <div>
            <div className="mb-8 border-b border-slate-200 pb-5">
              <p className="text-sm font-black text-blue-600">Company Overview</p>
              <h1 className="mt-2 text-4xl font-black">회사개요</h1>
            </div>
            <Card className="p-7">
              <h2 className="text-2xl font-black text-slate-950">{company.message}</h2>
              <p className="mt-4 leading-8 text-slate-600">{company.description}</p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                {[["회사명", company.koreanName], ["대표이사", company.ceo], ["설립", company.founded], ["주소", company.address], ["대표전화", company.phone], ["대표메일", company.email]].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[130px_1fr] border-b border-slate-200 last:border-b-0">
                    <div className="bg-slate-50 px-5 py-4 text-sm font-black text-slate-600">{k}</div>
                    <div className="px-5 py-4 text-sm font-bold text-slate-800">{v}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-slate-950 px-4 py-24 text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,.28),transparent_26%),radial-gradient(circle_at_85%_0%,rgba(6,182,212,.22),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.86fr]">
        <div>
          <Badge className="bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/20">ABOUT INFO SOLUTION</Badge>
          <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">{company.message}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-300">{company.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["기존/타 시스템 인터페이스", "오픈 안정화", "다국어 지원", "표준 ERP 프로세스", "기술지원센터 운영"].map((tag) => (
              <Badge key={tag} className="bg-white/10 text-white ring-1 ring-white/10">{tag}</Badge>
            ))}
          </div>
        </div>
        <Card className="border-white/10 bg-white/10 p-6 text-white backdrop-blur-xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {[["20+", "업력"], ["ERP/MES", "제조 특화"], ["Global", "다국어/해외 구축"], ["CSR", "기술지원 포털"]].map(([num, label]) => (
              <div key={label} className="rounded-3xl bg-white/10 p-6">
                <p className="text-4xl font-black text-cyan-300">{num}</p>
                <p className="mt-2 font-black text-slate-200">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-3xl bg-slate-900 p-5">
            <p className="text-sm font-black text-cyan-300">Company Data</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>대표이사: {company.ceo}</p>
              <p>설립: {company.founded}</p>
              <p>주소: {company.address}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function BusinessPage({ variant, setPage }) {
  const modern = variant === "b";

  if (!modern) {
    return (
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-slate-200 pb-5">
            <p className="text-sm font-black text-blue-600">Business Area</p>
            <h1 className="mt-2 text-4xl font-black">사업영역</h1>
          </div>
          <Card className="p-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-700 text-center text-xl font-black text-white shadow-lg">INFO<br />SOLUTION</div>
              <div className="grid w-full gap-4 md:grid-cols-5">
                {businessDomains.map((item) => (
                  <button key={item.code} onClick={() => setPage(item.code === "MES" ? "mes" : item.code === "ERP" ? "erp" : item.code === "WMS" ? "mobile" : "solutions")} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-blue-400 hover:bg-blue-50">
                    <p className="text-2xl font-black text-blue-700">{item.code}</p>
                    <p className="mt-2 text-sm font-black">{item.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="CONNECTED BUSINESS MAP" title="제조 데이터를 중심으로 연결되는 5대 사업영역" desc="B안에서는 기존 오각형 사업영역을 인터랙티브 플랫폼 맵처럼 재구성합니다." />
        <div className="relative mx-auto h-[560px] max-w-[760px]">
          <div className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] bg-slate-950 text-center text-white shadow-2xl">
            <Cpu className="mb-3 h-9 w-9 text-cyan-300" />
            <p className="text-2xl font-black">Manufacturing<br />Data Hub</p>
          </div>
          <div className="absolute inset-20 rounded-full border border-dashed border-blue-200" />
          {businessDomains.map((item, idx) => {
            const positions = [
              ['50%', '6%'], ['88%', '34%'], ['74%', '82%'], ['26%', '82%'], ['12%', '34%']
            ];
            return (
              <button key={item.code} onClick={() => setPage(item.code === "MES" ? "mes" : item.code === "ERP" ? "erp" : item.code === "WMS" ? "mobile" : "solutions")} style={{ left: positions[idx][0], top: positions[idx][1] }} className="absolute flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-xl transition hover:-translate-y-[56%] hover:border-cyan-300 hover:shadow-2xl">
                <p className="text-2xl font-black text-blue-600">{item.code}</p>
                <p className="mt-2 text-sm font-black">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SolutionsPage({ variant, setPage }) {
  const modern = variant === "b";
  if (!modern) {
    return (
      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block">
            <Card className="overflow-hidden">
              <div className="bg-blue-700 px-5 py-4 text-xl font-black text-white">솔루션</div>
              {['ERP', 'MES', 'PLM', 'Mobile', '삼성SCM'].map((item, idx) => (
                <div key={item} className={cx('border-b px-5 py-4 text-sm font-black', idx === 0 ? 'bg-blue-50 text-blue-700' : 'bg-white text-slate-600')}>{item}</div>
              ))}
            </Card>
          </aside>
          <div>
            <div className="mb-8 border-b border-slate-200 pb-5">
              <p className="text-sm font-black text-blue-600">Solution</p>
              <h1 className="mt-2 text-4xl font-black">솔루션</h1>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {mainSolutions.slice(0, 6).map((item) => <Card key={item.code} className="p-6"><p className="text-2xl font-black text-blue-700">{item.code}</p><p className="mt-2 font-black">{item.title}</p><p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p></Card>)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 px-4 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="SOLUTIONS" title="제품처럼 보이는 솔루션 컴포넌트" desc="B안에서는 솔루션을 단순 메뉴가 아니라 각각 독립적인 제품 카드와 상세 페이지로 구성합니다." />
        <SolutionGrid variant={variant} setPage={setPage} />
      </div>
    </section>
  );
}

function SolutionDetail({ variant, detail }) {
  const modern = variant === "b";

  if (!modern) {
    return (
      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block">
            <Card className="overflow-hidden">
              <div className="bg-blue-700 px-5 py-4 text-xl font-black text-white">솔루션</div>
              {["ERP", "MES", "PLM", "Mobile", "삼성SCM"].map((item) => <div key={item} className={cx('border-b px-5 py-4 text-sm font-black', item === detail.code ? 'bg-blue-50 text-blue-700' : 'bg-white text-slate-600')}>{item}</div>)}
            </Card>
          </aside>
          <div>
            <div className="mb-8 border-b border-slate-200 pb-5">
              <p className="text-sm font-black text-blue-600">Solution</p>
              <h1 className="mt-2 text-4xl font-black">{detail.title}</h1>
            </div>
            <Card className="p-7">
              <h2 className="text-2xl font-black">{detail.subtitle}</h2>
              <p className="mt-4 leading-8 text-slate-600">{detail.summary}</p>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="mb-4 font-black text-blue-700">업무 흐름</p>
                <div className="flex flex-col gap-3 md:flex-row">
                  {detail.flow.map((step, idx) => <div key={step} className="flex-1 rounded-xl bg-white p-4 text-center text-sm font-black shadow-sm">{idx + 1}. {step}</div>)}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-white px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge className="bg-blue-100 text-blue-700 ring-1 ring-blue-200">{detail.code}</Badge>
            <h1 className="mt-5 text-5xl font-black leading-tight">{detail.title}</h1>
            <p className="mt-4 text-xl font-black text-blue-700">{detail.subtitle}</p>
            <p className="mt-6 text-lg leading-9 text-slate-600">{detail.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2">{detail.benefits.map((b) => <Badge key={b} className="bg-slate-100 text-slate-700">{b}</Badge>)}</div>
          </div>
          <Card className="p-7 shadow-xl">
            <p className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-blue-600">Process Redesign</p>
            <div className="grid gap-4 md:grid-cols-5">
              {detail.flow.map((step, idx) => (
                <div key={step} className="rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 p-5 text-center">
                  <p className="text-xs font-black text-blue-400">STEP {idx + 1}</p>
                  <p className="mt-3 font-black text-slate-950">{step}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {(detail.images.length ? detail.images : ["리디자인 도식", "업무 흐름", "기대효과"]).map((img) => <Card key={img} className="flex h-56 items-center justify-center bg-slate-50 p-6 text-center font-black text-slate-500">{img}</Card>)}
        </div>
      </div>
    </section>
  );
}

function InfoPlusPage({ variant, setPage }) {
  const modern = variant === "b";
  if (!modern) {
    return (
      <section className="bg-slate-100 px-4 py-20">
        <div className="mx-auto max-w-md">
          <Card className="overflow-hidden">
            <div className="bg-blue-700 px-6 py-5 text-center text-2xl font-black text-white">INFOPLUS</div>
            <div className="p-7">
              <p className="text-center text-sm text-slate-500">고객지원 포털 로그인</p>
              <div className="mt-6 space-y-3">
                <input className="h-11 w-full rounded border border-slate-300 px-3" placeholder="아이디" />
                <input className="h-11 w-full rounded border border-slate-300 px-3" placeholder="비밀번호" type="password" />
                <Button variant="primary" className="h-11 w-full" onClick={() => setPage("csrCustomer")}>LOGIN</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(6,182,212,.2),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <Badge className="bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/20">INFOPLUS PORTAL</Badge>
          <h1 className="mt-6 text-5xl font-black leading-tight">고객 요청 흐름을<br />한눈에 확인하는 포털</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">요청 등록, 처리 현황, 답변 이력 확인을 하나의 고객지원 경험으로 제공합니다.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-4">{["접수", "처리", "검수", "완료"].map((s, i) => <div key={s} className="rounded-3xl bg-white/10 p-5"><p className="text-xs font-black text-cyan-300">STEP {i + 1}</p><p className="mt-2 text-xl font-black">{s}</p></div>)}</div>
        </div>
        <Card className="border-white/10 bg-white p-8 text-slate-950 shadow-2xl">
          <ShieldCheck className="mx-auto h-11 w-11 text-blue-600" />
          <h2 className="mt-4 text-center text-3xl font-black">INFOPLUS</h2>
          <div className="mt-8 space-y-3">
            <input className="h-12 w-full rounded-2xl border border-slate-200 px-4" placeholder="아이디" />
            <input className="h-12 w-full rounded-2xl border border-slate-200 px-4" placeholder="비밀번호" type="password" />
            <Button variant="primary" className="h-12 w-full" onClick={() => setPage("csrCustomer")}>포털 접속</Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

function CsrListPage({ role, variant, setPage }) {
  const isAdmin = role === "admin";
  const columns = isAdmin
    ? ["요청번호", "거래처", "제목", "요청구분", "업무구분", "상태", "우선순위", "요청일자", "요청자", "담당자", "공수(M/D)", "완료예정일", "완료일"]
    : ["요청번호", "제목", "요청구분", "업무구분", "상태", "우선순위", "요청일자", "요청자", "담당자", "공수(M/D)", "완료예정일", "완료일"];
  return (
    <section className="px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[240px_1fr]">
        <aside>
          <Card className="p-5">
            <p className="text-sm font-black">{isAdmin ? "관리자 현황" : "시노펙스(베트남)"}</p>
            <div className="mt-5 space-y-3 text-sm">
              {(isAdmin ? [["미완료", "3420건"], ["접수대기", "206건"], ["접수완료", "669건"], ["처리중", "561건"], ["검수요청", "1984건"]] : [["잔여공수(M/D)", "-0.3"], ["접수대기", "0건"], ["진행중", "17건"], ["완료", "62건"]]).map(([k, v]) => <div key={k} className="flex justify-between"><span>{k}</span><b>{v}</b></div>)}
            </div>
          </Card>
          <div className="mt-4 space-y-2">
            <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">요청 등록 매뉴얼</Button>
            <Button className="w-full">비밀번호 변경</Button>
            <Button className="w-full">LOGOUT</Button>
            <Button className="w-full" variant="primary" onClick={() => setPage("csrCreate")}>요청등록</Button>
          </div>
        </aside>
        <div>
          <Card className="p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap gap-2">
                <select className="h-10 rounded-xl border border-slate-200 px-3 text-sm"><option>요청일자</option></select>
                <input className="h-10 rounded-xl border border-slate-200 px-3 text-sm" value="2025-05-22" readOnly />
                <input className="h-10 rounded-xl border border-slate-200 px-3 text-sm" value="2026-05-22" readOnly />
              </div>
              <Button className="bg-green-600 text-white hover:bg-green-700"><Download className="mr-2 h-4 w-4" />엑셀 다운로드</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">{["접수대기", "접수완료", "처리중", "검수요청", "완료", "취소", "보류", "검수반려"].map((s) => <label key={s} className="flex items-center gap-1"><input type="checkbox" />{s}</label>)}</div>
            <div className="mt-4 flex gap-2">
              <select className="h-10 rounded-xl border border-slate-200 px-3 text-sm"><option>전체</option><option>요청번호</option><option>제목+내용</option></select>
              <input className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm" placeholder="검색어를 입력하세요" />
              <Button variant="primary"><Search className="h-4 w-4" /></Button>
            </div>
          </Card>
          <div className="mt-5 hidden overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white lg:block">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-50 text-xs font-black text-slate-500"><tr>{columns.map((c) => <th key={c} className="border-b px-3 py-3 text-left">{c}</th>)}</tr></thead>
              <tbody>
                {csrRows.map((row) => (
                  <tr key={row.id} onClick={() => setPage(isAdmin ? "csrAdmin" : "csrCreate")} className="cursor-pointer border-b hover:bg-blue-50">
                    <td className="px-3 py-3 font-bold">{row.id}</td>
                    {isAdmin && <td className="px-3 py-3 text-blue-600">{row.company}</td>}
                    <td className="max-w-[260px] px-3 py-3 text-blue-600">{row.title}</td>
                    <td className="px-3 py-3">{row.type}</td>
                    <td className="px-3 py-3">{row.work}</td>
                    <td className="px-3 py-3"><Badge className={statusColor[row.status]}>{row.status}</Badge></td>
                    <td className="px-3 py-3">{row.priority}</td>
                    <td className="px-3 py-3">{row.requestDate}</td>
                    <td className="px-3 py-3">{row.requester}</td>
                    <td className="px-3 py-3">{row.manager}</td>
                    <td className="px-3 py-3 text-red-500">{row.md}</td>
                    <td className="px-3 py-3">{row.due}</td>
                    <td className="px-3 py-3">{row.done}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 grid gap-3 lg:hidden">
            {csrRows.map((row) => <Card key={row.id} className="p-5"><div className="flex justify-between"><Badge className={statusColor[row.status]}>{row.status}</Badge><b>{row.priority}</b></div><p className="mt-3 font-black text-blue-600">{row.title}</p><p className="mt-2 text-sm text-slate-500">{row.id} · {row.work} · {row.manager}</p></Card>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function CsrCreatePage({ variant }) {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between bg-blue-700 px-6 py-4 text-white">
            <h1 className="text-2xl font-black">요청등록</h1>
            <X className="h-8 w-8 text-orange-500" />
          </div>
          <div className="p-6">
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-slate-700"><b className="text-blue-700">요구사항</b>을 자세히 등록해 주시면 신속하게 처리 됩니다.</div>
            <div className="grid gap-4 md:grid-cols-2">
              {customerCreateFields.map(([label, value, type]) => (
                <div key={label} className="grid grid-cols-[120px_1fr] items-center gap-3 text-sm">
                  <label className="font-black text-slate-600">{label}</label>
                  {type === "readonly" && <input className="h-10 rounded-xl border border-slate-200 bg-slate-100 px-3 text-slate-500" value={value} readOnly />}
                  {type === "input" && <input className="h-10 rounded-xl border border-slate-200 px-3" />}
                  {type === "select" && <select className="h-10 rounded-xl border border-slate-200 px-3"><option>{value}</option></select>}
                  {type === "checkbox" && <label className="flex items-center gap-2"><input type="checkbox" />{value}</label>}
                </div>
              ))}
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-black text-slate-600">요청 내용</label>
              <textarea className="h-56 w-full rounded-2xl border border-slate-200 p-4" placeholder="요청 내용을 입력하세요" />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input type="file" className="rounded-xl border border-slate-200 p-3" />
              <input type="file" className="rounded-xl border border-slate-200 p-3" />
            </div>
            <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-800">등록된 요청 내용은 수정할 수 없으며, 추가 문의나 보완 내용은 댓글로 남길 수 있습니다.</div>
            <div className="mt-6 flex justify-center"><Button variant="primary" className="h-12 px-10"><Plus className="mr-2 h-4 w-4" />요청등록</Button></div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-500 md:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-lg font-black text-slate-950">INFO SOLUTION</p>
          <p className="mt-3">주소: {company.address}</p>
          <p className="mt-1">대표전화: {company.phone} | FAX: {company.fax} | 대표메일: {company.email}</p>
        </div>
        <div className="grid gap-2 md:text-right">
          <p className="flex items-center gap-2 md:justify-end"><MapPin className="h-4 w-4" /> 4호선 안산역 2번 출구 도보 5분</p>
          <p className="flex items-center gap-2 md:justify-end"><Phone className="h-4 w-4" /> {company.phone}</p>
          <p className="flex items-center gap-2 md:justify-end"><Mail className="h-4 w-4" /> {company.email}</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return <DemoShell />;
}
