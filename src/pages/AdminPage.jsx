import { useEffect, useState } from 'react';
import { getAllUsers } from '@/api/user.api';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/api/axios';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

// Returns array exactly matching the reference image logic:
// Near start: [1,2,3,4,5,6,7,8,'...',last]
// Near end:   [1,'...',last-7,...,last]
// Middle:     [1,'...',cur-2,cur-1,cur,cur+1,cur+2,'...',last]
const getPageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 6) {
    return [1, 2, 3, 4, 5, 6, 7, 8, '...', totalPages];
  }
  if (currentPage >= totalPages - 5) {
    return [
      1,
      '...',
      ...Array.from({ length: 8 }, (_, i) => totalPages - 7 + i),
    ];
  }
  return [
    1,
    '...',
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    '...',
    totalPages,
  ];
};

const btnBase =
  'h-9 min-w-[36px] px-2 rounded-lg text-sm font-medium border transition-colors duration-150 flex items-center justify-center';
const btnIdle =
  'border-surface-border bg-white text-ink hover:bg-canvas cursor-pointer';
const btnActive = 'border-ink bg-ink text-white';
const btnDisabled = 'border-surface-border bg-white text-body/40 cursor-not-allowed';

const AdminPage = () => {
  useDocumentTitle('Admin Dashboard');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalUsers: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchUsers = async (currentPage) => {
    try {
      setLoading(true);
      const res = await getAllUsers(currentPage, 10);
      setUsers(res.data.users);
      setPaginationInfo(res.data.pagination);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const goToPage = (p) => {
    if (p >= 1 && p <= paginationInfo.totalPages && !loading) setPage(p);
  };

  const pageNumbers = getPageNumbers(page, paginationInfo.totalPages || 1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-accent-periwinkle/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-accent-periwinkle" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-medium text-ink tracking-tight">Admin Dashboard</h1>
          <p className="text-body text-sm">Manage users in the system</p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border bg-canvas/50">
                <th className="py-4 px-6 font-mono-caps text-[11px] text-body tracking-[0.05em]">Username</th>
                <th className="py-4 px-6 font-mono-caps text-[11px] text-body tracking-[0.05em]">Email</th>
                <th className="py-4 px-6 font-mono-caps text-[11px] text-body tracking-[0.05em]">Role</th>
                <th className="py-4 px-6 font-mono-caps text-[11px] text-body tracking-[0.05em]">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-body">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-body">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-surface-border hover:bg-canvas/30 transition-colors">
                    <td className="py-4 px-6 text-ink font-medium">{user.username}</td>
                    <td className="py-4 px-6 text-body">{user.email}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-accent-periwinkle/10 text-accent-periwinkle'
                          : 'bg-canvas-dark text-on-dark'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-body text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-surface-border px-6 py-4 bg-canvas/50">
          <div className="flex items-center justify-center gap-1.5">

            {/* Back */}
            <button
              onClick={() => goToPage(page - 1)}
              disabled={!paginationInfo.hasPrevPage || loading}
              className={`${btnBase} gap-1 px-3 ${!paginationInfo.hasPrevPage || loading ? btnDisabled : btnIdle}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back
            </button>

            {/* Page numbers */}
            {pageNumbers.map((p, idx) =>
              p === '...' ? (
                <span
                  key={`dots-${idx}`}
                  className="h-9 min-w-[36px] flex items-center justify-center text-sm text-body/60 select-none"
                >
                  ···
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  disabled={loading}
                  className={`${btnBase} ${p === page ? btnActive : btnIdle}`}
                >
                  {p}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={!paginationInfo.hasNextPage || loading}
              className={`${btnBase} gap-1 px-3 ${!paginationInfo.hasNextPage || loading ? btnDisabled : btnIdle}`}
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>

          <p className="text-center text-xs text-body mt-3">
            Page <span className="font-medium text-ink">{page}</span> of{' '}
            <span className="font-medium text-ink">{paginationInfo.totalPages || 1}</span>
            {' '}· {paginationInfo.totalUsers} total users
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminPage;
