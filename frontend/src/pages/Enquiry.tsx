import { useState } from "react";

function Enquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.phone || !formData.message) {
  alert("Please fill all fields");
  return;
}

if (!/\S+@\S+\.\S+/.test(formData.email)) {
  alert("Please enter a valid email");
  return;
}

if (!/^\d{10}$/.test(formData.phone)) {
  alert("Please enter a valid 10-digit phone number");
  return;
}
  try {
    const response = await fetch("http://localhost:5000/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit enquiry");
    }

    alert("Enquiry submitted successfully");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  } catch (error) {
    alert("Failed to submit enquiry");
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Customer / Student Enquiry
        </h1>

        <p className="mb-6 text-gray-600">
          Submit your enquiry and our team will get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Enter your enquiry"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 cursor-pointer">
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}

export default Enquiry;