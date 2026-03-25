import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import CreditBalance from '../components/wallet/CreditBalance';
import TransactionList from '../components/wallet/TransactionList';
import { useCredits } from '../hooks/useCredits';

const buyTiers = [
  { amount: 100, price: '₹49', popular: false },
  { amount: 250, price: '₹99', popular: true },
  { amount: 600, price: '₹199', popular: false },
];

export default function Wallet() {
  const { balance, transactions } = useCredits();

  const totalEarned = transactions.filter((t) => t.type === 'earn').reduce((a, t) => a + t.amount, 0);
  const totalSpent = transactions.filter((t) => t.type === 'spend').reduce((a, t) => a + t.amount, 0);

  const pieData = [
    { name: 'Available', value: balance, color: '#2563eb' },
    { name: 'Earned', value: totalEarned, color: '#16a34a' },
    { name: 'Spent', value: totalSpent, color: '#dc2626' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />

      <main className="md:ml-14 lg:ml-60 pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="font-heading text-2xl font-semibold text-ink mb-8">Wallet</h1>

          {/* Balance */}
          <div className="card mb-8">
            <CreditBalance />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Transactions */}
            <div className="card">
              <h2 className="font-heading text-lg font-semibold text-ink mb-4">Transaction History</h2>
              <TransactionList transactions={transactions} />
            </div>

            {/* Right */}
            <div className="space-y-6">
              {/* Earn CTA */}
              <div className="bg-brand-soft border border-brand/20 rounded-card p-5">
                <h3 className="font-heading text-lg font-semibold text-ink mb-1">Earn More Credits</h3>
                <p className="text-sm text-ink-muted mb-4">Upload a course → earn 50 credits on approval, plus credits per enrollment.</p>
                <Link to="/upload" className="btn-primary text-sm inline-flex items-center gap-2">
                  Upload a Course <ArrowRight size={16} />
                </Link>
              </div>

              {/* Pie Chart */}
              <div className="card">
                <h2 className="font-heading text-lg font-semibold text-ink mb-4">Credit Breakdown</h2>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e4e0',
                          borderRadius: '8px',
                          fontSize: '13px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5 text-xs text-ink-muted">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}: {item.value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy Credits */}
              <div className="card">
                <h2 className="font-heading text-lg font-semibold text-ink mb-4">Buy Credits</h2>
                <div className="space-y-3">
                  {buyTiers.map((tier) => (
                    <div
                      key={tier.price}
                      className={`flex items-center justify-between p-3 rounded-card border ${
                        tier.popular ? 'border-brand bg-brand-soft' : 'border-border'
                      }`}
                    >
                      <div>
                        <p className="font-heading font-semibold text-ink">
                          {tier.amount} credits
                        </p>
                        <p className="text-sm text-ink-muted">{tier.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {tier.popular && <span className="tag-blue">Best Value</span>}
                        <button className="btn-secondary text-xs px-3 py-1.5 opacity-60 cursor-not-allowed" disabled>
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
