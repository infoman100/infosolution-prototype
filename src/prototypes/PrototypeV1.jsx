import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  BarChart3,
  Factory,
  Database,
  ClipboardList,
  Wrench,
  Boxes,
  Search,
  Download,
  Plus,
  Bell,
  User,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  MessageSquare,
  Paperclip,
  Smartphone,
  Monitor,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = ["회사소개", "솔루션", "INFOPLUS", "CSR", "문의하기"];

const solutions = [
  {
    name: "ERP",
    sub: "Enterprise Resource Planning",
    desc: "영업, 구매, 회계, 생산 기준정보를 하나의 체계로 연결합니다.",
    icon: Database,
  },
  {
    name: "MES",
    sub: "Manufacturing Execution System",
    desc: "작업지시, 공정, 실적, 품질 데이터를 실시간으로 수집합니다.",
    icon: Factory,
  },
  {
    name: "WMS",
    sub: "Warehouse Management System",
    desc: "입고, 출고, 재고, 창고 흐름을 정확하게 추적합니다.",
    icon: Boxes,
  },
  {
    name: "CMMS",
    sub: "Computerized Maintenance Management System",
    desc: "설비 점검, 고장 이력, 보전 계획을 체계적으로 관리합니다.",
    icon: Wrench,
  },
  {
    name: "PLM",
    sub: "Product Lifecycle Management",
    desc: "BOM, 모델, 설계변경, 제품 정보를 표준화합니다.",
    icon: ClipboardList,
  },
];

const summaryCards = [
  { label: "미완료", value: "3,419", tone: "bg-slate-50 text-slate-700 border-slate-200" },
  { label: "접수대기", value: "205", tone: "bg-gray-50 text-gray-700 border-gray-200" },
  { label: "접수완료", value: "669", tone: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "처리중", value: "562", tone: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "검수요청", value: "1,983", tone: "bg-violet-50 text-violet-700 border-violet-200" },
  { label: "완료", value: "6,690", tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

const requests = [
  {
    id: "260522-002",
    company: "세일전자",
    title: "모델 자원변경 화면 내 자원정보 순서 연동 요청",
    type: "수정개발",
    work: "생산관리",
    status: "접수완료",
    priority: "긴급",
    date: "2026-05-22",
    requester: "이선구",
    manager: "이태훈",
    due: "2026-05-24",
  },
  {
    id: "260522-001",
    company: "백송전자",
    title: "메뉴얼 문의 건",
    type: "기타",
    work: "생산관리",
    status: "접수완료",
    priority: "중",
    date: "2026-05-22",
    requester: "이민재",
    manager: "이태훈",
    due: "2026-05-25",
  },
  {
    id: "260521-008",
    company: "두레",
    title: "VOC처리 등록된 내용 조회가 되지 않음",
    type: "오류확인",
    work: "품질관리",
    status: "완료",
    priority: "긴급",
    date: "2026-05-21",
    requester: "박재범",
    manager: "배지혁",
    due: "2026-05-21",
  },
  {
    id: "260521-007",
    company: "SHINSUNG(TN)",
    title: "4월 반제품 회원 취소 가능 확인 요청의 건",
    type: "오류확인",
    work: "원가관리",
    status: "완료",
    priority: "긴급",
    date: "2026-05-21",
    requester: "아잉(Anh)",
    manager: "안상현",
    due: "2026-05-21",
  },
  {
    id: "260521-006",
    company: "EVS(북미)",
    title: "일괄 출고처리 기능 엑셀 업로드",
    type: "신규개발",
    work: "영업관리",
    status: "처리중",
    priority: "상",
    date: "2026-05-21",
    requester: "EVS",
    manager: "배지혁",
    due: "2026-05-23",
  },
];

const statusStyle = {
  접수완료: "bg-blue-100 text-blue-700",
  처리중: "bg-amber-100 text-amber-700",
  완료: "bg-emerald-100 text-emerald-700",
  검수요청: "bg-violet-100 text-violet-700",
};

const priorityStyle = {
  긴급: "bg-rose-100 text-rose-700",
  상: "bg-orange-100 text-orange-700",
  중: "bg-slate-100 text-slate-700",
};

function Badge({ children, className = "" }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-sm font-bold tracking-[0.22em] text-blue-600">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-base leading-7 text-slate-600">{desc}</p>}
    </div>
  );
}

export default function InfoSolutionPrototype() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(requests[0]);

  const timeline = useMemo(
    () => [
      { label: "접수", done: true },
      { label: "담당자 배정", done: true },
      { label: "처리중", done: selected.status !== "접수완료" },
      { label: "검수요청", done: false },
      { label: "완료", done: selected.status === "완료" },
    ],
    [selected]
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">IS</div>
            <div>
              <p className="text-lg font-black leading-none tracking-tight">INFO SOLUTION</p>
              <p className="text-xs font-medium text-slate-500">Manufacturing IT Partner</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item}`} className="text-sm font-semibold text-slate-700 transition hover:text-blue-600">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="outline" className="rounded-full">자료 요청</Button>
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700">INFOPLUS 접속</Button>
          </div>

          <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            {navItems.map((item) => (
              <a key={item} href={`#${item}`} className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#dbeafe,transparent_28%),linear-gradient(135deg,#f8fafc_0%,#eff6ff_55%,#ffffff_100%)]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-5 bg-blue-100 text-blue-700">React 기반 통합 리뉴얼 프로토타입</Badge>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
                제조업의 모든 데이터를<br />
                <span className="text-blue-600">하나의 흐름</span>으로 연결합니다
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                ERP, MES, WMS, CMMS 기반의 제조 IT 솔루션으로 현장의 데이터와 경영 의사결정을 하나로 연결합니다.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 rounded-full bg-blue-600 px-6 text-base hover:bg-blue-700">
                  솔루션 보기 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-12 rounded-full px-6 text-base">
                  CSR 포털 미리보기
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  ["20+", "구축 경험"],
                  ["5", "핵심 솔루션"],
                  ["24h", "고객 지원"],
                ].map(([num, label]) => (
                  <div key={label} className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
                    <p className="text-2xl font-black text-slate-950">{num}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
              <div className="rounded-[2rem] border border-white bg-white/80 p-4 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-blue-200">Manufacturing Dashboard</p>
                      <p className="text-2xl font-black">Real-time KPI</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["가동률", "92.4%"],
                      ["불량률", "0.8%"],
                      ["재공재고", "1,284"],
                      ["납기준수", "98.2%"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-white/10 p-4">
                        <p className="text-xs text-slate-300">{label}</p>
                        <p className="mt-2 text-2xl font-black">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl bg-gradient-to-r from-blue-500/40 to-cyan-400/20 p-4">
                    <p className="text-sm font-semibold">ERP · MES · WMS · CMMS 통합 데이터 흐름</p>
                    <div className="mt-4 h-20 rounded-xl bg-white/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="솔루션" className="px-4 py-20 md:px-6">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="SOLUTIONS"
              title="제조 현장과 경영 정보를 연결하는 솔루션"
              desc="기존 홈페이지의 사업영역을 카드형 구조로 정리하여 고객이 솔루션별 역할과 기대 효과를 빠르게 이해할 수 있도록 구성합니다."
            />
            <div className="grid gap-5 md:grid-cols-5">
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Card key={solution.name} className="group overflow-hidden rounded-3xl border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-950">{solution.name}</h3>
                      <p className="mt-1 text-xs font-semibold text-slate-400">{solution.sub}</p>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{solution.desc}</p>
                      <button className="mt-5 inline-flex items-center text-sm font-bold text-blue-600">
                        자세히 보기 <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="INFOPLUS" className="bg-slate-50 px-4 py-20 md:px-6">
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-3 text-sm font-bold tracking-[0.22em] text-blue-600">INFOPLUS PORTAL</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">고객지원까지 이어지는 통합 포털</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                홈페이지에서 끝나는 것이 아니라, 고객이 요청을 등록하고 처리 상태를 확인하는 CSR 흐름까지 하나의 경험으로 제공합니다.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-4">
                {[
                  ["STEP 1", "접수", "요청 등록"],
                  ["STEP 2", "배정", "담당자 지정"],
                  ["STEP 3", "처리", "진행 상황 공유"],
                  ["STEP 4", "완료", "검수 및 반영"],
                ].map(([step, title, desc]) => (
                  <div key={step} className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-xs font-black text-blue-600">{step}</p>
                    <p className="mt-2 text-xl font-black text-slate-950">{title}</p>
                    <p className="mt-1 text-sm text-slate-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="rounded-[2rem] border-none shadow-xl">
              <CardContent className="p-8">
                <div className="mb-7 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black">INFOPLUS</h3>
                  <p className="mt-2 text-sm text-slate-500">고객지원 포털 로그인</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">아이디를 입력하세요</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <ShieldCheck className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">비밀번호를 입력하세요</span>
                  </div>
                  <Button className="h-12 w-full rounded-2xl bg-blue-600 font-bold hover:bg-blue-700">로그인</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="CSR" className="px-4 py-20 md:px-6">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="CSR PORTAL"
              title="고객 요청 현황을 한눈에 확인하는 CSR 화면"
              desc="기존 테이블 중심 화면은 유지하되, 상태 요약·필터·배지·상세 타임라인을 추가하여 고객지원 사용성을 높입니다."
            />

            <div className="grid gap-4 md:grid-cols-6">
              {summaryCards.map((card) => (
                <div key={card.label} className={`rounded-3xl border p-5 ${card.tone}`}>
                  <p className="text-sm font-bold">{card.label}</p>
                  <p className="mt-2 text-2xl font-black">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 flex-col gap-3 md:flex-row">
                  <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-500">2026-05-22 ~ 2026-06-22</div>
                  <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3">
                    <Search className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">검색어를 입력하세요</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl"><Download className="mr-2 h-4 w-4" />엑셀</Button>
                  <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700"><Plus className="mr-2 h-4 w-4" />요청등록</Button>
                </div>
              </div>
            </div>

            <div className="mt-6 hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-slate-50 text-left text-xs font-bold text-slate-500">
                  <tr>
                    {['요청번호', '거래처', '제목', '업무구분', '상태', '우선순위', '요청일자', '담당자', '완료예정일'].map((h) => (
                      <th key={h} className="px-4 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requests.map((row) => (
                    <tr key={row.id} onClick={() => setSelected(row)} className="cursor-pointer border-t border-slate-100 transition hover:bg-blue-50/50">
                      <td className="px-4 py-4 font-semibold text-slate-600">{row.id}</td>
                      <td className="px-4 py-4 font-bold text-blue-600">{row.company}</td>
                      <td className="max-w-sm px-4 py-4 font-semibold text-slate-800">{row.title}</td>
                      <td className="px-4 py-4 text-slate-600">{row.work}</td>
                      <td className="px-4 py-4"><Badge className={statusStyle[row.status]}>{row.status}</Badge></td>
                      <td className="px-4 py-4"><Badge className={priorityStyle[row.priority]}>{row.priority}</Badge></td>
                      <td className="px-4 py-4 text-slate-600">{row.date}</td>
                      <td className="px-4 py-4 text-slate-600">{row.manager}</td>
                      <td className="px-4 py-4 text-slate-600">{row.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 lg:hidden">
              {requests.map((row) => (
                <button key={row.id} onClick={() => setSelected(row)} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge className={priorityStyle[row.priority]}>{row.priority}</Badge>
                    <Badge className={statusStyle[row.status]}>{row.status}</Badge>
                  </div>
                  <p className="text-base font-black text-slate-950">{row.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{row.company} · {row.work}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <span>요청일 {row.date}</span>
                    <span>담당 {row.manager}</span>
                    <span>번호 {row.id}</span>
                    <span>예정 {row.due}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-4 py-20 text-white md:px-6">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="rounded-[2rem] border-white/10 bg-white/5 text-white shadow-none">
              <CardContent className="p-7">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-blue-300">REQUEST DETAIL</p>
                    <h3 className="mt-2 text-2xl font-black">{selected.title}</h3>
                  </div>
                  <Badge className={statusStyle[selected.status]}>{selected.status}</Badge>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["요청번호", selected.id],
                    ["거래처", selected.company],
                    ["업무구분", selected.work],
                    ["우선순위", selected.priority],
                    ["요청자", selected.requester],
                    ["담당자", selected.manager],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-slate-400">{k}</p>
                      <p className="mt-1 font-bold text-white">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-5 text-slate-800">
                  <p className="text-sm font-black text-slate-950">요청 내용</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    표준공정 Master 화면의 순번대로 제조 BOM/Routing 자원정보가 정렬될 수 있도록 로직 수정 요청드립니다. 관련 화면과 처리 우선순위를 함께 검토 부탁드립니다.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600">
                    <Paperclip className="h-4 w-4" /> 첨부 이미지 2개
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/10 bg-white text-slate-950 shadow-xl">
              <CardContent className="p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">처리 진행 현황</h3>
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div className="mt-7 space-y-4">
                  {timeline.map((step, idx) => (
                    <div key={step.label} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${step.done ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                          {step.done ? <CheckCircle2 className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
                        </div>
                        {idx < timeline.length - 1 && <div className="h-10 w-px bg-slate-200" />}
                      </div>
                      <div className="pt-1">
                        <p className="font-black">{step.label}</p>
                        <p className="mt-1 text-sm text-slate-500">{step.done ? "진행 완료" : "대기 중"}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 rounded-3xl bg-slate-50 p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950">
                    <MessageSquare className="h-4 w-4 text-blue-600" /> 답변/댓글 작성
                  </div>
                  <div className="h-28 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-400">처리 의견을 입력하세요.</div>
                  <div className="mt-3 flex justify-end">
                    <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700">답변 등록</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="px-4 py-20 md:px-6">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-blue-600 to-slate-950 p-8 text-white md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="text-sm font-bold tracking-[0.22em] text-blue-100">RESPONSIVE EXPERIENCE</p>
                <h2 className="mt-3 text-3xl font-black md:text-4xl">모바일에서는 테이블이 아닌 카드형 CSR 화면으로 전환</h2>
                <p className="mt-4 max-w-2xl text-blue-100">
                  고객은 휴대폰에서도 요청 제목, 상태, 우선순위, 담당자, 완료 예정일을 빠르게 확인할 수 있습니다.
                </p>
                <div className="mt-6 flex gap-3">
                  <Badge className="bg-white/15 text-white"><Monitor className="mr-1 h-3 w-3" /> PC 테이블</Badge>
                  <Badge className="bg-white/15 text-white"><Smartphone className="mr-1 h-3 w-3" /> 모바일 카드</Badge>
                </div>
              </div>
              <div className="mx-auto w-full max-w-xs rounded-[2rem] bg-white p-4 text-slate-950 shadow-2xl">
                <div className="mb-4 h-2 w-20 rounded-full bg-slate-200 mx-auto" />
                <div className="rounded-3xl border border-slate-200 p-5 shadow-sm">
                  <div className="mb-3 flex justify-between">
                    <Badge className="bg-rose-100 text-rose-700"><AlertTriangle className="mr-1 h-3 w-3" /> 긴급</Badge>
                    <Badge className="bg-blue-100 text-blue-700">접수완료</Badge>
                  </div>
                  <p className="text-base font-black">모델 자원변경 화면 내 자원정보 순서 연동 요청</p>
                  <p className="mt-2 text-sm text-slate-500">세일전자 · 생산관리</p>
                  <div className="mt-4 space-y-2 text-xs text-slate-500">
                    <p>요청일: 2026-05-22</p>
                    <p>담당자: 이태훈</p>
                    <p>완료예정일: 2026-05-24</p>
                  </div>
                  <Button className="mt-4 h-10 w-full rounded-2xl bg-blue-600 hover:bg-blue-700">상세보기</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-4 py-10 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p className="font-bold text-slate-700">INFO SOLUTION React Renewal Prototype</p>
          <p>회사 홈페이지 + INFOPLUS/CSR 고객 접점 통합 개선안</p>
        </div>
      </footer>
    </div>
  );
}
