import { useEffect, useState } from "react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "New" | "Contacted" | "Resolved";
  createdAt: string;
}

function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchEnquiries = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/enquiries");

      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      const data: Enquiry[] = await response.json();
      setEnquiries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: string,
    status: "New" | "Contacted" | "Resolved",
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/enquiries/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      fetchEnquiries();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEnquiry = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/enquiries/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete enquiry");
      }

      fetchEnquiries();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(search.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(search.toLowerCase()) ||
      enquiry.phone.includes(search);

    const matchesStatus =
      statusFilter === "All" || enquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Admin Enquiry Dashboard
        </h1>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search by name, email or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-md"/>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-48">
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <p className="text-gray-600">No enquiries found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Message</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="border-t">
                      <td className="px-4 py-3">{enquiry.name}</td>
                      <td className="px-4 py-3">{enquiry.email}</td>
                      <td className="px-4 py-3">{enquiry.phone}</td>
                      <td className="px-4 py-3">{enquiry.message}</td>
                      <td className="px-4 py-3">
                        <select
                          value={enquiry.status}
                          onChange={(e) =>
                            updateStatus(
                              enquiry._id,
                              e.target.value as
                                | "New"
                                | "Contacted"
                                | "Resolved",
                            )
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2">
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteEnquiry(enquiry._id)}
                          className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700 cursor-pointer">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
