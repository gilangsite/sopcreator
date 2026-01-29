'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ChevronDown, TrendingUp, Users, Eye, Target, DollarSign, Loader2 } from 'lucide-react';

type CalculatorType =
  | 'follow-rate'
  | 'cpf'
  | 'budget-estimation'
  | 'cpc'
  | 'cpv'
  | 'conversion-rate';

interface CalculatorOption {
  id: CalculatorType;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const calculatorOptions: CalculatorOption[] = [
  {
    id: 'follow-rate',
    label: 'Follow Rate',
    description: 'Hitung persentase orang yang follow dari total impressions',
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'conversion-rate',
    label: 'Conversion Rate',
    description: 'Hitung persentase konversi dari total impressions',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    id: 'cpf',
    label: 'Cost per Follower (CPF)',
    description: 'Hitung biaya per follower dari campaign ads',
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    id: 'cpv',
    label: 'Cost per 1000 Views (CPV)',
    description: 'Hitung biaya per 1000 view dari campaign video',
    icon: <Eye className="w-5 h-5" />
  },
  {
    id: 'cpc',
    label: 'Cost per Conversion (CPC)',
    description: 'Hitung biaya per konversi dari campaign',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    id: 'budget-estimation',
    label: 'Budget Estimation',
    description: 'Estimasi budget yang dibutuhkan untuk target follower',
    icon: <Target className="w-5 h-5" />
  }
];

export default function AdsCalculatorPage() {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Input states for different calculators
  const [newFollower, setNewFollower] = useState<string>('');
  const [impressions, setImpressions] = useState<string>('');
  const [budgetSpent, setBudgetSpent] = useState<string>('');
  const [targetFollower, setTargetFollower] = useState<string>('');
  const [cpfInput, setCpfInput] = useState<string>('');
  const [conversions, setConversions] = useState<string>('');
  const [views, setViews] = useState<string>('');

  const formatRupiah = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
  };

  const calculate = () => {
    setIsCalculating(true);
    setResult(null);

    // Simulate calculation delay for animation effect
    setTimeout(() => {
      let calculatedResult = '';

      switch (selectedCalculator) {
        case 'follow-rate': {
          const followers = parseNumber(newFollower);
          const impr = parseNumber(impressions);
          const budgetP = parseNumber(budgetSpent);

          if (impr > 0) {
            const rate = (followers / impr) * 100;
            calculatedResult = `${rate.toFixed(2)}% Follow Rate`;
            calculatedResult += `\n\nSetiap ${Math.round(100 / rate)} orang melihat konten, ada 1 orang yang follow.`;

            if (budgetP > 0) {
              const expectation = budgetP * (rate / 100);
              calculatedResult += `\n\n\nNEW FOLLOWER EXPECTATION\n${Math.round(expectation).toLocaleString('id-ID')} Followers\nBerdasarkan Follow Rate ${rate.toFixed(2)}% dengan rencana budget ${formatRupiah(budgetP)}.\nTotal New Follower Expected`;
            }
          }
          break;
        }
        case 'conversion-rate': {
          const conv = parseNumber(conversions);
          const impr = parseNumber(impressions);
          const budgetP = parseNumber(budgetSpent);

          if (impr > 0) {
            const rate = (conv / impr) * 100;
            calculatedResult = `${rate.toFixed(2)}% Conversion Rate`;
            calculatedResult += `\n\nSetiap ${Math.round(100 / rate)} orang melihat konten, ada 1 orang yang convert.`;

            if (budgetP > 0) {
              const expectation = budgetP * (rate / 100);
              calculatedResult += `\n\n\nCONVERSION EXPECTATION\n${Math.round(expectation).toLocaleString('id-ID')} Konversi\nBerdasarkan Conversion Rate ${rate.toFixed(2)}% dengan rencana budget ${formatRupiah(budgetP)}.\nTotal Conversion Expected`;
            }
          }
          break;
        }
        case 'cpf': {
          const budget = parseNumber(budgetSpent);
          const followers = parseNumber(newFollower);
          const target = parseNumber(targetFollower);

          if (followers > 0) {
            const cpfValue = budget / followers;
            calculatedResult = `CPF = ${formatRupiah(cpfValue)}`;
            calculatedResult += `\n\nBiaya untuk mendapatkan 1 follower adalah ${formatRupiah(cpfValue)}.`;

            if (target > 0) {
              const budgetNeeds = cpfValue * target;
              calculatedResult += `\n\n\nESTIMATION\n${formatRupiah(budgetNeeds)}\nUntuk mendapatkan ${target.toLocaleString('id-ID')} followers tambahan dengan CPF ${formatRupiah(cpfValue)}.`;
            }
          }
          break;
        }
        case 'cpv': {
          const budget = parseNumber(budgetSpent);
          const totalViews = parseNumber(views);
          const target = parseNumber(targetFollower);

          if (totalViews > 0) {
            const cpv1000 = (budget / totalViews) * 1000;
            calculatedResult = `CPV = ${formatRupiah(cpv1000)}`;
            calculatedResult += `\n\nBiaya untuk setiap 1.000 views adalah ${formatRupiah(cpv1000)}.`;

            if (target > 0) {
              const budgetNeeds = (cpv1000 / 1000) * target;
              calculatedResult += `\n\n\nESTIMATION\n${formatRupiah(budgetNeeds)}\nUntuk mendapatkan total ${target.toLocaleString('id-ID')} views dengan biaya ${formatRupiah(cpv1000)} per 1.000 views.`;
            }
          }
          break;
        }
        case 'cpc': {
          const budget = parseNumber(budgetSpent);
          const conv = parseNumber(conversions);
          const target = parseNumber(targetFollower);

          if (conv > 0) {
            const cpcValue = budget / conv;
            calculatedResult = `CPC = ${formatRupiah(cpcValue)}`;
            calculatedResult += `\n\nBiaya untuk mendapatkan 1 konversi adalah ${formatRupiah(cpcValue)}.`;

            if (target > 0) {
              const budgetNeeds = cpcValue * target;
              calculatedResult += `\n\n\nESTIMATION\n${formatRupiah(budgetNeeds)}\nUntuk mendapatkan total ${target.toLocaleString('id-ID')} konversi dengan unit cost ${formatRupiah(cpcValue)}.`;
            }
          }
          break;
        }
        case 'budget-estimation': {
          const unitCost = parseNumber(cpfInput);
          const target = parseNumber(targetFollower);

          if (unitCost > 0) {
            const budgetNeeded = unitCost * target;
            calculatedResult = `Budget Needs = ${formatRupiah(budgetNeeded)}`;
            calculatedResult += `\n\nEstimasi total budget yang dibutuhkan untuk target yang ditentukan.`;

            if (target > 0) {
              calculatedResult += `\n\n\nESTIMATION\n${formatRupiah(budgetNeeded)}\nBerdasarkan unit cost ${formatRupiah(unitCost)} untuk target ${target.toLocaleString('id-ID')} unit.`;
            }
          }
          break;
        }
      }

      setResult(calculatedResult || 'Mohon isi semua field dengan nilai yang valid');
      setIsCalculating(false);
    }, 800);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (!selectedCalculator) return;

    const hasValidInput = () => {
      switch (selectedCalculator) {
        case 'follow-rate':
          return newFollower && impressions;
        case 'conversion-rate':
          return conversions && impressions;
        case 'cpf':
          return budgetSpent && newFollower;
        case 'cpv':
          return budgetSpent && views;
        case 'cpc':
          return budgetSpent && conversions;
        case 'budget-estimation':
          return cpfInput && targetFollower;
        default:
          return false;
      }
    };

    if (hasValidInput()) {
      const timer = setTimeout(calculate, 500);
      return () => clearTimeout(timer);
    } else {
      setResult(null);
    }
  }, [selectedCalculator, newFollower, impressions, budgetSpent, targetFollower, cpfInput, conversions, views]);

  const resetInputs = () => {
    setNewFollower('');
    setImpressions('');
    setBudgetSpent('');
    setTargetFollower('');
    setCpfInput('');
    setConversions('');
    setViews('');
    setResult(null);
  };

  const handleSelectCalculator = (id: CalculatorType) => {
    setSelectedCalculator(id);
    setIsDropdownOpen(false);
    resetInputs();
  };

  const selectedOption = calculatorOptions.find(opt => opt.id === selectedCalculator);

  return (
    <div className="min-h-screen relative bg-[#F8FAFC] text-slate-800 overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-60 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px] mix-blend-multiply opacity-50" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-6 shadow-lg shadow-blue-500/25">
              <Calculator className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
              Ads <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">Calculator</span>
            </h1>
            <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto">
              Smart calculator untuk mengestimasi budget dan mengukur metrik kesuksesan advertising campaign
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          {/* Goal Selector Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <label className="block text-sm font-medium text-slate-600 mb-3">
              Pilih Tipe Kalkulasi
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  {selectedOption ? (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors">
                        {selectedOption.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-slate-800">{selectedOption.label}</p>
                        <p className="text-sm text-slate-500">{selectedOption.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <p className="text-slate-500">Pilih tipe kalkulasi...</p>
                    </>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-20"
                  >
                    {calculatorOptions.map((option, index) => (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelectCalculator(option.id)}
                        className={`w-full p-4 flex items-center gap-3 hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-b-0 ${selectedCalculator === option.id ? 'bg-blue-50' : ''
                          }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCalculator === option.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 text-slate-500'
                          }`}>
                          {option.icon}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-slate-800">{option.label}</p>
                          <p className="text-sm text-slate-500">{option.description}</p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Dynamic Input Form */}
          <AnimatePresence mode="wait">
            {selectedCalculator && (
              <motion.div
                key={selectedCalculator}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 md:p-8"
              >
                <div className="space-y-5">
                  {/* Follow Rate Inputs */}
                  {selectedCalculator === 'follow-rate' && (
                    <>
                      <InputField
                        label="New Follower"
                        placeholder="contoh: 1000"
                        value={newFollower}
                        onChange={setNewFollower}
                        suffix="followers"
                      />
                      <InputField
                        label="Impressions"
                        placeholder="contoh: 100000"
                        value={impressions}
                        onChange={setImpressions}
                        suffix="impressions"
                      />
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Budget Estimation (Opsional)</p>
                        <div className="space-y-4">
                          <InputField
                            label="Budget Plan (Rencana Budget)"
                            placeholder="Rp 1.000.000"
                            value={budgetSpent}
                            onChange={setBudgetSpent}
                            prefix="Rp"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Conversion Rate Inputs */}
                  {selectedCalculator === 'conversion-rate' && (
                    <>
                      <InputField
                        label="Conversions"
                        placeholder="contoh: 100"
                        value={conversions}
                        onChange={setConversions}
                        suffix="conversions"
                      />
                      <InputField
                        label="Impressions"
                        placeholder="contoh: 100000"
                        value={impressions}
                        onChange={setImpressions}
                        suffix="impressions"
                      />
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Budget Estimation (Opsional)</p>
                        <div className="space-y-4">
                          <InputField
                            label="Budget Plan (Rencana Budget)"
                            placeholder="Rp 1.000.000"
                            value={budgetSpent}
                            onChange={setBudgetSpent}
                            prefix="Rp"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* CPF Inputs */}
                  {selectedCalculator === 'cpf' && (
                    <>
                      <InputField
                        label="New Follower"
                        placeholder="contoh: 1000"
                        value={newFollower}
                        onChange={setNewFollower}
                        suffix="followers"
                      />
                      <InputField
                        label="Budget Spent"
                        placeholder="contoh: 1000000"
                        value={budgetSpent}
                        onChange={setBudgetSpent}
                        prefix="Rp"
                      />
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Budget Estimation</p>
                        <InputField
                          label="Target Follower Berikutnya"
                          placeholder="contoh: 5000"
                          value={targetFollower}
                          onChange={setTargetFollower}
                          suffix="followers"
                        />
                      </div>
                    </>
                  )}

                  {/* CPV Inputs */}
                  {selectedCalculator === 'cpv' && (
                    <>
                      <InputField
                        label="Total Views"
                        placeholder="contoh: 10000"
                        value={views}
                        onChange={setViews}
                        suffix="views"
                      />
                      <InputField
                        label="Budget Spent"
                        placeholder="contoh: 500000"
                        value={budgetSpent}
                        onChange={setBudgetSpent}
                        prefix="Rp"
                      />
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Budget Estimation</p>
                        <InputField
                          label="Target Views Berikutnya"
                          placeholder="contoh: 100000"
                          value={targetFollower}
                          onChange={setTargetFollower}
                          suffix="views"
                        />
                      </div>
                    </>
                  )}

                  {/* CPC Inputs */}
                  {selectedCalculator === 'cpc' && (
                    <>
                      <InputField
                        label="Conversions"
                        placeholder="contoh: 50"
                        value={conversions}
                        onChange={setConversions}
                        suffix="conversions"
                      />
                      <InputField
                        label="Budget Spent"
                        placeholder="contoh: 1000000"
                        value={budgetSpent}
                        onChange={setBudgetSpent}
                        prefix="Rp"
                      />
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Budget Estimation</p>
                        <InputField
                          label="Target Konversi Berikutnya"
                          placeholder="contoh: 500"
                          value={targetFollower}
                          onChange={setTargetFollower}
                          suffix="konversi"
                        />
                      </div>
                    </>
                  )}

                  {/* Budget Estimation Inputs */}
                  {selectedCalculator === 'budget-estimation' && (
                    <>
                      <InputField
                        label="Target Unit (Follower/Conv/Views)"
                        placeholder="contoh: 1000"
                        value={targetFollower}
                        onChange={setTargetFollower}
                        suffix="unit"
                      />
                      <InputField
                        label="Unit Cost (CPF/CPC/CPV)"
                        placeholder="contoh: 500"
                        value={cpfInput}
                        onChange={setCpfInput}
                        prefix="Rp"
                      />
                    </>
                  )}
                </div>

                {/* Result Section */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <AnimatePresence mode="wait">
                    {isCalculating ? (
                      <motion.div
                        key="calculating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3 py-8"
                      >
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                        <span className="text-blue-600 font-medium animate-pulse">Calculating...</span>
                      </motion.div>
                    ) : result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", duration: 0.5 }}
                      >
                        {/* Main Metric Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 mb-4 border border-blue-100">
                          <p className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wide">Analysis Results</p>
                          <div className="text-3xl font-bold text-slate-900 mb-2">
                            {result.split('\n\n')[0]}
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {result.split('\n\n')[1]}
                          </p>
                        </div>

                        {/* Budget Estimation Card (If available) */}
                        {result.includes('\n\n\n') && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20"
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <Target className="w-5 h-5 text-blue-400" />
                              <p className="text-sm font-medium text-blue-400 uppercase tracking-widest">
                                {result.split('\n\n\n')[1].split('\n')[0] || 'Budget Estimation'}
                              </p>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <p className="text-slate-400 text-xs mb-1">
                                  {result.split('\n\n\n')[1].split('\n')[3] || 'Total Budget Needed'}
                                </p>
                                <p className="text-3xl font-bold text-white">
                                  {result.split('\n\n\n')[1].split('\n')[1]}
                                </p>
                              </div>
                              <div className="pt-4 border-t border-white/10">
                                <p className="text-slate-400 text-xs">
                                  {result.split('\n\n\n')[1].split('\n')[2]}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-slate-400"
                      >
                        <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Masukkan data untuk melihat hasil kalkulasi</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!selectedCalculator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-500">Pilih tipe kalkulasi untuk memulai</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

// Input Field Component
function InputField({
  label,
  placeholder,
  value,
  onChange,
  prefix,
  suffix
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-4 text-slate-500 font-medium">{prefix}</span>
        )}
        <input
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all duration-200 outline-none text-slate-800 font-medium ${prefix ? 'pl-12' : ''
            } ${suffix ? 'pr-24' : ''}`}
        />
        {suffix && (
          <span className="absolute right-4 text-slate-400 text-sm">{suffix}</span>
        )}
      </div>
    </div>
  );
}

// Formula Hint Component
function FormulaHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-blue-600 text-xs font-bold">f</span>
      </div>
      <p className="text-sm text-blue-700">{children}</p>
    </div>
  );
}
