import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Play,
  Factory,
  Cpu,
  Database,
  Boxes,
  Wrench,
  Layers3,
  Workflow,
  Search,
  Plus,
  Download,
  Bell,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  MessageSquare,
  Paperclip,
  Smartphone,
  Monitor,
  Sparkles,
  Activity,
  Gauge,
  ChevronRight,
  CircleDot,
  MousePointer2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = ["Vision", "Platform", "Solutions", "INFOPLUS", "CSR"];

const platformNodes = [
  { label: "ERP", x: "50%", y: "6%", icon: Database },
  { label: "MES", x: "88%", y: "34%", icon: Factory },
  { label: "WMS", x: "74%", y: "82%", icon: Boxes },
  { label: "CMMS", x: "26%", y: "82%", icon: Wrench },
  { label: "PLM", x: "12%", y: "34%", icon: Layers3 },
];

const solutionCards = [
  {
    name: "Manufacturing Execution",
    code: "MES",
    desc: "작업지시, 공정, 실적, 품질 데이터를 실시간 제조 흐름으로 연결합니다.",
    metric: "실시간 공정 추적",
    icon: Factory,
  },
  {
    name: "Enterprise Resource",
    code: "ERP",
    desc: "영업·구매·회계·생산 기준정보를 경영 의사결정 데이터로 통합합니다.",
    metric: "전사 업무 표준화",
    icon: Database,
  },
  {
    name: "Warehouse Flow",
    code: "WMS",
    desc: "입출고, 재고, 위치, 창고 흐름을 데이터 기반으로 추적합니다.",
    metric: "재고 가시성 향상",
    icon: Boxes,
  },
  {
    name: "Maintenance Intelligence",
    code: "CMMS",
    desc: "설비 점검, 고장, 보전 이력을 축적해 안정적인 운영을 지원합니다.",
    metric: "설비 이력 관리",
    icon: Wrench,
  },
];

const requestStats = [
  { label: "미완료", value: "3,419", trend: "+12", color: "from-slate-500 to-slate-700" },
  { label: "접수완료", value: "669", trend: "+8", color: "from-blue-500 to-cyan-500" },
  { label: "처리중", value: "562", trend: "-4", color: "from-amber-500 to-orange-500" },
  { label: "검수요청", value: "1,983", trend: "+22", color: "from-violet-500 to-fuchsia-500" },
];

const requests = [
  {
    id: "260522-002",
    company: "세일전자",
    title: "모델 자원변경 화면 내 자원정보 순서 연동 요청",
    category: "생산관리",
    status: "접수완료",
    priority: "긴급",
    date: "2026-05-22",
    manager: "이태훈",
    due: "2026-05-24",
    progress: 42,
  },
  {
    id: "260521-008",
    company: "두레",
    title: "VOC처리 등록된 내용 조회가 되지 않음",
    category: "품질관리",
    status: "완료",
    priority: "긴급",
    date: "2026-05-21",
    manager: "배지혁",
    due: "2026-05-21",
    progress: 100,
  },
  {
    id: "260521-006",
    company: "EVS(북미)",
    title: "일괄 출고처리 기능 엑셀 업로드",
    category: "영업관리",
    status: "처리중",
    priority: "상",
    date: "2026-05-21",
    manager: "배지혁",
    due: "2026-05-23",
    progress: 68,
  },
];

const statusStyle = {
  접수완료: "bg-blue-500/15 text-blue-700 ring-blue-500/20",
  처리중: "bg-amber-500/15 text-amber-700 ring-amber-500/20",
  완료: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20",
};

const priorityStyle = {
  긴급: "bg-rose-500/15 text-rose-700 ring-rose-500/20",
  상: "bg-orange-500/15 text-orange-700 ring-orange-500/20",
};

function Badge({ children, className = "" }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${className}`}>{children}</span>;
}

function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ y: [0, -28, 0], x: [0, 18, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function SectionLabel({ kicker, title, desc, align = "center" }) {
  return (
    <div className={`mb-12 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 text-sm font-black tracking-[0.28em] text-cyan-500"
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
        className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl"
      >
        {title}
      </motion.h2>
      {desc && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="mt-5 text-base leading-8 text-slate-600 md:text-lg"
        >
          {desc}
        </motion.p>
      )}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-slate-950/60 px-4 py-3 text-white shadow-2xl backdrop-blur-2xl md:px-6">
        <a href="#top" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-black">
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,.45),transparent)]" />
            <span className="relative">IS</span>
          </div>
          <div>
            <p className="text-sm font-black leading-none tracking-tight md:text-base">INFO SOLUTION</p>
            <p className="text-[10px] font-semibold text-cyan-200">Autonomous Manufacturing Portal</p>
          </div>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="rounded-full px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white">
              {item}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">문의하기</Button>
          <Button className="rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300">포털 접속</Button>
        </div>
        <button className="lg:hidden" onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</button>
      </div>
      <motion.div className="mx-auto mt-2 h-1 max-w-7xl origin-left rounded-full bg-cyan-400" style={{ scaleX }} />
      {open && (
        <div className="mx-4 mt-2 rounded-3xl border border-white/10 bg-slate-950/90 p-3 text-white shadow-2xl backdrop-blur-2xl lg:hidden">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="block rounded-2xl px-4 py-3 font-bold hover:bg-white/10">{item}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pt-32 text-white md:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.35),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(37,99,235,.35),transparent_28%),linear-gradient(180deg,#020617_0%,#0f172a_52%,#ffffff_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      <FloatingOrb className="left-10 top-32 h-64 w-64 bg-cyan-400/30" />
      <FloatingOrb className="right-16 top-60 h-80 w-80 bg-blue-500/30" delay={1.2} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 py-16 md:grid-cols-[0.95fr_1.05fr] md:py-24">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Badge className="mb-6 bg-white/10 text-cyan-200 ring-white/15"><Sparkles className="mr-1 h-3 w-3" /> React Motion Prototype</Badge>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Manufacturing Data,
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">Moving as One.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            회사 홈페이지와 INFOPLUS/CSR 포털을 분리된 화면이 아닌 하나의 디지털 경험으로 설계합니다. 첫 방문부터 고객지원까지 자연스럽게 연결되는 현대적인 반응형 프로토타입입니다.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button className="h-13 rounded-full bg-cyan-400 px-7 text-base font-black text-slate-950 hover:bg-cyan-300">
              프로토타입 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-13 rounded-full border-white/20 bg-white/5 px-7 text-base font-black text-white hover:bg-white/10 hover:text-white">
              <Play className="mr-2 h-4 w-4" /> 발표용 시나리오
            </Button>
          </div>
          <div className="mt-12 flex items-center gap-6 text-sm font-bold text-slate-300">
            <div className="flex items-center gap-2"><MousePointer2 className="h-4 w-4 text-cyan-300" /> Scroll Interaction</div>
            <div className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-cyan-300" /> Mobile First</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92, rotateX: 8 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ duration: 0.8, delay: 0.12 }} className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-cyan-400/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl">
            <div className="rounded-[1.7rem] bg-slate-950/95 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-cyan-300">Live Operation Hub</p>
                  <p className="text-2xl font-black">Factory Command Center</p>
                </div>
                <Activity className="h-8 w-8 text-cyan-300" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["가동률", "92.4%", Gauge],
                  ["불량률", "0.8%", AlertTriangle],
                  ["요청처리", "78%", CheckCircle2],
                  ["응답 SLA", "96%", Clock3],
                ].map(([label, value, Icon], idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.08 }}
                    className="rounded-3xl border border-white/10 bg-white/[0.07] p-4"
                  >
                    <div className="mb-4 flex items-center justify-between text-slate-400">
                      <span className="text-xs font-bold">{label}</span>
                      <Icon className="h-4 w-4 text-cyan-300" />
                    </div>
                    <p className="text-3xl font-black">{value}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-black">Data Flow</p>
                  <Workflow className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  {['ERP','MES','WMS','CMMS','CSR'].map((v, idx) => (
                    <React.Fragment key={v}>
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2.4, delay: idx * 0.18, repeat: Infinity }}
                        className="rounded-2xl bg-white/10 px-3 py-3 text-xs font-black"
                      >
                        {v}
                      </motion.div>
                      {idx < 4 && <div className="h-px flex-1 bg-cyan-300/40" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PlatformOrbit() {
  return (
    <section id="Platform" className="relative overflow-hidden bg-white px-4 py-28 md:px-6">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionLabel
          align="left"
          kicker="CONNECTED PLATFORM"
          title="정적인 소개 페이지가 아닌 움직이는 제조 플랫폼 이미지"
          desc="수석님 안의 랜딩페이지 구조에서 더 나아가, React 컴포넌트·모션·데이터 시각화를 활용해 회사의 기술력을 더 입체적으로 보여줍니다."
        />
        <div className="relative mx-auto h-[520px] w-full max-w-[560px]">
          <motion.div
            className="absolute inset-12 rounded-full border border-dashed border-blue-200"
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-24 rounded-full border border-dashed border-cyan-200"
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] bg-slate-950 text-white shadow-2xl">
            <Cpu className="mb-3 h-9 w-9 text-cyan-300" />
            <p className="text-3xl font-black">INFOPLUS</p>
            <p className="mt-1 text-xs font-bold text-slate-400">Core Data Hub</p>
          </div>
          {platformNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: node.x, top: node.y }}
              >
                <div className="group flex h-24 w-24 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-xl transition hover:-translate-y-2 hover:border-cyan-300">
                  <Icon className="h-7 w-7 text-blue-600" />
                  <p className="mt-2 text-sm font-black">{node.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="Solutions" className="bg-slate-950 px-4 py-28 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          kicker="SMART MANUFACTURING"
          title="솔루션은 카드가 아니라 제품처럼 보이게"
          desc="각 솔루션을 독립된 컴포넌트로 구성해 향후 실제 페이지 확장, 상세 페이지 연결, 고객사 사례 연결이 가능하도록 보여줍니다."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {solutionCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.code}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl transition group-hover:bg-cyan-400/35" />
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="text-3xl font-black text-white/20">{item.code}</p>
                  </div>
                  <h3 className="text-xl font-black">{item.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.desc}</p>
                  <div className="mt-6 rounded-2xl bg-white/10 p-4">
                    <p className="text-xs font-bold text-cyan-200">KEY VALUE</p>
                    <p className="mt-1 font-black">{item.metric}</p>
                  </div>
                  <button className="mt-6 inline-flex items-center text-sm font-black text-cyan-300">
                    Explore <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InfoPlusPortal() {
  return (
    <section id="INFOPLUS" className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-28 md:px-6">
      <FloatingOrb className="right-12 top-16 h-72 w-72 bg-blue-300/35" />
      <FloatingOrb className="bottom-20 left-16 h-60 w-60 bg-cyan-300/30" delay={1.4} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionLabel
            align="left"
            kicker="CUSTOMER EXPERIENCE"
            title="INFOPLUS를 단순 로그인 화면이 아닌 고객 포털로"
            desc="고객이 가장 자주 접하는 영역은 회사 소개가 아니라 지원 요청 화면입니다. 로그인 전부터 처리 절차와 지원 품질을 보여주는 포털형 화면으로 전환합니다."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["01", "Request", "요청 등록"],
              ["02", "Assign", "담당 배정"],
              ["03", "Resolve", "처리 진행"],
              ["04", "Verify", "검수 완료"],
            ].map(([num, title, desc], idx) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-3xl border border-white bg-white/75 p-5 shadow-lg backdrop-blur"
              >
                <p className="text-sm font-black text-blue-600">{num}</p>
                <p className="mt-4 text-xl font-black text-slate-950">{title}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[3rem] bg-blue-500/15 blur-2xl" />
          <Card className="relative overflow-hidden rounded-[2rem] border-white/70 bg-white/90 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-blue-600">INFOPLUS</p>
                  <h3 className="mt-1 text-3xl font-black text-slate-950">Customer Portal</h3>
                </div>
                <ShieldCheck className="h-9 w-9 text-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-400">아이디를 입력하세요</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <ShieldCheck className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-400">비밀번호를 입력하세요</span>
                </div>
                <Button className="h-13 w-full rounded-2xl bg-slate-950 text-base font-black hover:bg-slate-800">로그인</Button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-bold text-blue-600">오늘 신규 요청</p>
                  <p className="mt-1 text-2xl font-black">27</p>
                </div>
                <div className="rounded-2xl bg-cyan-50 p-4">
                  <p className="text-xs font-bold text-cyan-600">평균 응답</p>
                  <p className="mt-1 text-2xl font-black">4.2h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function CSRDashboard() {
  const [selected, setSelected] = useState(requests[0]);
  const timeline = useMemo(() => ["접수", "담당 배정", "처리중", "검수요청", "완료"], []);
  const currentIndex = selected.status === "완료" ? 4 : selected.status === "처리중" ? 2 : 1;

  return (
    <section id="CSR" className="bg-white px-4 py-28 md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          kicker="CSR COMMAND CENTER"
          title="고객지원 화면은 업무 시스템이 아니라 상태를 읽는 대시보드로"
          desc="기존 CSR 테이블의 업무 흐름은 유지하되, 상단 지표·상태 배지·상세 타임라인·모바일 카드 UI로 고객 관점의 사용성을 강화합니다."
        />

        <div className="grid gap-4 md:grid-cols-4">
          {requestStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
            >
              <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
              <div className="p-6">
                <p className="text-sm font-black text-slate-500">{stat.label}</p>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-4xl font-black text-slate-950">{stat.value}</p>
                  <Badge className="bg-slate-100 text-slate-600 ring-slate-200">{stat.trend}</Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 md:flex-row">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500">2026-05-22 ~ 2026-06-22</div>
              <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-400">거래처, 제목, 요청번호 검색</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-2xl bg-white"><Download className="mr-2 h-4 w-4" />Excel</Button>
              <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" />요청등록</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.78fr]">
          <Card className="overflow-hidden rounded-[2rem] border-slate-200 shadow-sm">
            <CardContent className="p-0">
              <div className="hidden lg:block">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-slate-950 text-left text-xs font-black uppercase tracking-wide text-white">
                    <tr>
                      {['요청번호', '거래처', '제목', '상태', '우선순위', '담당자', '진행률'].map((h) => (
                        <th key={h} className="px-5 py-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((row) => (
                      <tr key={row.id} onClick={() => setSelected(row)} className={`cursor-pointer border-t border-slate-100 transition hover:bg-blue-50 ${selected.id === row.id ? 'bg-blue-50' : ''}`}>
                        <td className="px-5 py-5 font-bold text-slate-600">{row.id}</td>
                        <td className="px-5 py-5 font-black text-blue-600">{row.company}</td>
                        <td className="px-5 py-5 font-bold text-slate-900">{row.title}</td>
                        <td className="px-5 py-5"><Badge className={statusStyle[row.status]}>{row.status}</Badge></td>
                        <td className="px-5 py-5"><Badge className={priorityStyle[row.priority]}>{row.priority}</Badge></td>
                        <td className="px-5 py-5 font-semibold text-slate-600">{row.manager}</td>
                        <td className="px-5 py-5">
                          <div className="h-2 w-24 rounded-full bg-slate-100">
                            <div className="h-2 rounded-full bg-blue-600" style={{ width: `${row.progress}%` }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-4 p-4 lg:hidden">
                {requests.map((row) => (
                  <button key={row.id} onClick={() => setSelected(row)} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm">
                    <div className="mb-4 flex items-center justify-between"><Badge className={priorityStyle[row.priority]}>{row.priority}</Badge><Badge className={statusStyle[row.status]}>{row.status}</Badge></div>
                    <p className="font-black text-slate-950">{row.title}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-500">{row.company} · {row.category}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-500"><span>요청일 {row.date}</span><span>담당 {row.manager}</span><span>번호 {row.id}</span><span>예정 {row.due}</span></div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 shadow-xl">
            <CardContent className="p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-blue-600">REQUEST DETAIL</p>
                  <h3 className="mt-2 text-2xl font-black text-slate-950">{selected.title}</h3>
                </div>
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[["거래처", selected.company], ["업무", selected.category], ["담당자", selected.manager], ["완료예정", selected.due]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-black text-slate-400">{k}</p><p className="mt-1 font-black text-slate-950">{v}</p></div>
                ))}
              </div>
              <div className="mt-7">
                <p className="mb-4 text-sm font-black text-slate-950">처리 타임라인</p>
                <div className="space-y-4">
                  {timeline.map((step, idx) => (
                    <div key={step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${idx <= currentIndex ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{idx <= currentIndex ? <CheckCircle2 className="h-5 w-5" /> : <CircleDot className="h-5 w-5" />}</div>
                        {idx < timeline.length - 1 && <div className="h-8 w-px bg-slate-200" />}
                      </div>
                      <div className="pt-1"><p className="font-black text-slate-950">{step}</p><p className="text-sm font-semibold text-slate-500">{idx <= currentIndex ? '진행 완료' : '대기 중'}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-7 rounded-3xl bg-slate-950 p-5 text-white">
                <p className="flex items-center gap-2 text-sm font-black"><MessageSquare className="h-4 w-4 text-cyan-300" /> 고객 문의 요약</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">표준공정 Master 화면의 순번대로 제조 BOM/Routing 자원정보가 정렬될 수 있도록 로직 수정 요청.</p>
                <p className="mt-4 flex items-center gap-2 text-sm font-bold text-cyan-300"><Paperclip className="h-4 w-4" /> 첨부 이미지 2개</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function MobileShowcase() {
  return (
    <section className="overflow-hidden bg-slate-950 px-4 py-28 text-white md:px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
        <SectionLabel
          align="left"
          kicker="MOBILE FIRST"
          title="기존 모바일의 가장 큰 문제를 명확하게 개선"
          desc="PC 테이블을 축소해 보여주는 방식이 아니라, 요청별 카드 UI로 전환해 고객이 모바일에서도 빠르게 확인할 수 있도록 제안합니다."
        />
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-8 rounded-[3rem] bg-cyan-400/20 blur-3xl" />
          <motion.div
            initial={{ y: 40, opacity: 0, rotate: -4 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] border border-white/10 bg-white p-4 text-slate-950 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-2 w-24 rounded-full bg-slate-200" />
            <div className="mb-4 flex items-center justify-between rounded-3xl bg-slate-950 px-5 py-4 text-white">
              <div><p className="text-xs font-bold text-cyan-300">CSR Mobile</p><p className="font-black">요청 현황</p></div>
              <Smartphone className="h-5 w-5 text-cyan-300" />
            </div>
            {requests.slice(0, 2).map((row) => (
              <div key={row.id} className="mb-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex justify-between"><Badge className={priorityStyle[row.priority]}>{row.priority}</Badge><Badge className={statusStyle[row.status]}>{row.status}</Badge></div>
                <p className="font-black leading-6">{row.title}</p>
                <p className="mt-2 text-sm font-semibold text-slate-500">{row.company} · {row.category}</p>
                <div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${row.progress}%` }} /></div>
                <Button className="mt-4 h-10 w-full rounded-2xl bg-blue-600 font-black hover:bg-blue-700">상세보기</Button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function InfoSolutionModernPrototype() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header />
      <Hero />
      <PlatformOrbit />
      <Solutions />
      <InfoPlusPortal />
      <CSRDashboard />
      <MobileShowcase />
      <footer className="border-t border-slate-200 px-4 py-10 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm font-semibold text-slate-500 md:flex-row">
          <p className="font-black text-slate-950">INFO SOLUTION Modern React Prototype</p>
          <p>Animated homepage + INFOPLUS/CSR customer experience renewal</p>
        </div>
      </footer>
    </div>
  );
}
