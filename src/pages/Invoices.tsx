import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";
import Badge from "../components/ui/Badge";
import { invoices } from "../data/invoices";
import { Download, FileText } from "lucide-react";

export default function InvoicesPage() {
  const handleDownloadInvoice = (invoice: (typeof invoices)[number]) => {
    const invoiceContent = `MOCK INVOICE

Invoice ID: ${invoice.id}
Vendor: ${invoice.vendor}
Date: ${invoice.date}
Status: ${invoice.status.toUpperCase()}
Amount: Rs ${invoice.amount.toLocaleString()}

Bill To:
Zorvyn Finance Dashboard
Demo Account Holder

Line Items:
1. Subscription Service Access ........ Rs ${invoice.amount.toLocaleString()}

Subtotal: Rs ${invoice.amount.toLocaleString()}
Tax: Rs 0
Total: Rs ${invoice.amount.toLocaleString()}

This is a mock invoice generated for demo purposes only.
`;

    const blob = new Blob([invoiceContent], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${invoice.id.toLowerCase()}-mockinvoice.txt`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex bg-surface min-h-screen transition-colors">
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
                {invoices.map((inv) => (
                  <tr key={inv.id} className="group transition-colors">
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
                    <td className="py-5 text-sm font-black text-gray-800">Rs {inv.amount.toLocaleString()}</td>
                    <td className="py-5">
                      <Badge 
                        text={inv.status} 
                        variant={inv.status === 'paid' ? 'success' : 'warning'} 
                      />
                    </td>
                    <td className="py-5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDownloadInvoice(inv)}
                        className="p-2 text-gray-400 rounded-xl transition-all"
                      >
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
