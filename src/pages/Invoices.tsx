import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import Badge from "../components/ui/Badge";
import { Download, FileText, Filter, Search } from "lucide-react";

const mockInvoices = [
  { id: "INV-001", vendor: "Amazon Web Services", date: "Mar 12, 2026", amount: 1250.00, status: "paid" },
  { id: "INV-002", vendor: "Adobe Creative Cloud", date: "Mar 15, 2026", amount: 4500.00, status: "paid" },
  { id: "INV-003", vendor: "Figma Professional", date: "Mar 28, 2026", amount: 1100.00, status: "pending" },
  { id: "INV-004", vendor: "GitHub Enterprise", date: "Apr 01, 2026", amount: 800.00, status: "paid" },
];

export default function InvoicesPage() {
  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar />
      <Container>
        <Header />
        <div className="px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">Invoices</h2>
              <p className="text-gray-400 text-sm mt-1">Download and manage your billing history</p>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] border-b border-gray-50">
                  <th className="pb-4">Invoice ID</th>
                  <th className="pb-4">Vendor</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50">
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 font-bold text-sm text-gray-800">{inv.id}</td>
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                          <FileText size={16} />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{inv.vendor}</span>
                      </div>
                    </td>
                    <td className="py-5 text-sm text-gray-400 font-medium">{inv.date}</td>
                    <td className="py-5 text-sm font-black text-gray-800">₹{inv.amount.toLocaleString()}</td>
                    <td className="py-5">
                      <Badge 
                        text={inv.status} 
                        variant={inv.status === 'paid' ? 'success' : 'warning'} 
                      />
                    </td>
                    <td className="py-5 text-right">
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}