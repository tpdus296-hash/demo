/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Users, ShoppingBag, Target, 
  AlertCircle, CheckCircle2, ArrowUpRight, ArrowDownRight,
  Filter, Download, Calendar, MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';

// --- 목업 데이터 ---

const SALES_DATA = [
  { month: '1월', sales: 4500, target: 4000 },
  { month: '2월', sales: 5200, target: 4800 },
  { month: '3월', sales: 4800, target: 5000 },
  { month: '4월', sales: 6100, target: 5500 },
  { month: '5월', sales: 5900, target: 6000 },
  { month: '6월', sales: 7200, target: 6500 },
];

const CATEGORY_DATA = [
  { name: '스킨케어', value: 45, color: '#6366f1' },
  { name: '메이크업', value: 30, color: '#ec4899' },
  { name: '헤어케어', value: 15, color: '#10b981' },
  { name: '향수', value: 10, color: '#f59e0b' },
];

const PRODUCT_ANALYSIS = [
  { id: 1, code: 'COS-SK-001', name: '어드밴스드 나이트 리페어 세럼', category: '스킨케어', sales: 1250, target: 1500, unitPrice: 155000, status: '위기', priority: '높음', materialSetupDate: '2026-03-05' },
  { id: 2, code: 'COS-MK-042', name: '벨벳 매트 립스틱', category: '메이크업', sales: 980, target: 800, unitPrice: 32000, status: '정상', priority: '중간', materialSetupDate: '2026-03-10' },
  { id: 3, code: 'COS-MK-089', name: '하이드레이팅 글로우 파운데이션', category: '메이크업', sales: 750, target: 1200, unitPrice: 58000, status: '위기', priority: '높음', materialSetupDate: '2026-03-02' },
  { id: 4, code: 'COS-HC-015', name: '실크 단백질 샴푸', category: '헤어케어', sales: 450, target: 400, unitPrice: 24000, status: '정상', priority: '낮음', materialSetupDate: '2026-03-15' },
  { id: 5, code: 'COS-SK-022', name: '비타민 C 브라이트닝 크림', category: '스킨케어', sales: 1100, target: 1000, unitPrice: 89000, status: '우수', priority: '중간', materialSetupDate: '2026-03-12' },
  { id: 6, code: 'COS-FR-007', name: '로즈 에센스 퍼퓸', category: '향수', sales: 320, target: 600, unitPrice: 128000, status: '주의', priority: '높음', materialSetupDate: '2026-03-08' },
];

// --- 컴포넌트 ---

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <div className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {change}
      </div>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
  </motion.div>
);

export default function App() {
  const totalSales = useMemo(() => PRODUCT_ANALYSIS.reduce((acc, curr) => acc + curr.sales, 0), []);
  const totalTarget = useMemo(() => PRODUCT_ANALYSIS.reduce((acc, curr) => acc + curr.target, 0), []);
  const achievementRate = ((totalSales / totalTarget) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      {/* 헤더 */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">코스메틱 인사이트 프로</h1>
          <p className="text-slate-500 mt-1">수주 현황 분석 및 전략적 경영 대시보드</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4 mr-2" />
            최근 30일
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            보고서 내보내기
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        {/* 통계 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="총 매출액" value={`₩${(totalSales * 100000).toLocaleString()}`} change="+12.5%" icon={TrendingUp} trend="up" />
          <StatCard title="총 주문 건수" value="1,284건" change="+8.2%" icon={ShoppingBag} trend="up" />
          <StatCard title="활성 고객 수" value="8,432명" change="-2.4%" icon={Users} trend="down" />
          <StatCard title="목표 달성률" value={`${achievementRate}%`} change="+4.1%" icon={Target} trend="up" />
        </div>

        {/* 차트 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 매출 추이 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">매출 vs 목표 추이</h3>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500"></span> 실제 매출</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-200"></span> 목표치</div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sales" name="매출" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="target" name="목표" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 카테고리별 분포 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <h3 className="font-bold text-slate-900 mb-6">카테고리별 매출 비중</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {CATEGORY_DATA.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-slate-600">{cat.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{cat.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 우선순위 관리 테이블 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">전략적 품목 관리</h3>
              <p className="text-sm text-slate-500">매출 목표 달성을 위해 즉각적인 조치가 필요한 품목</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-nowrap">카테고리</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-nowrap">품목 코드</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-nowrap">품목명</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-nowrap">매출 / 목표</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-nowrap">단가</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-nowrap">자재 세팅 예정일</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-nowrap">상태</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-nowrap">우선순위</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PRODUCT_ANALYSIS.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded w-fit">{product.code}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-900">₩{product.sales.toLocaleString()}만</span>
                          <span className="text-slate-400">/ ₩{product.target.toLocaleString()}만</span>
                        </div>
                        <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              (product.sales / product.target) >= 1 ? 'bg-emerald-500' : 
                              (product.sales / product.target) >= 0.7 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min((product.sales / product.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">₩{product.unitPrice.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-medium">{product.materialSetupDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {product.status === '위기' ? (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                        <span className={`text-xs font-semibold ${
                          product.status === '위기' ? 'text-rose-600' : 
                          product.status === '주의' ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        product.priority === '높음' ? 'bg-rose-50 text-rose-700' :
                        product.priority === '중간' ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-700'
                      }`}>
                        {product.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">전체 품목 보기</button>
          </div>
        </motion.div>
      </main>

      <footer className="max-w-7xl mx-auto mt-12 pb-8 text-center text-slate-400 text-xs">
        <p>© 2026 코스메틱 인사이트 프로. All rights reserved. 데이터 업데이트 기준: {new Date().toLocaleDateString()}.</p>
      </footer>
    </div>
  );
}
