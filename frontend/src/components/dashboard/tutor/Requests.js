import React, { useState } from "react";
import Sidebar from "../Sidebar";

export default function Requests() {
  const [selectedRequest, setSelectedRequest] = useState(null); // Tracks the request to view
  const [requests, setRequests] = useState([
    { id: 1, student: "Alice Johnson", topic: "Control Structures", date: "2024-12-08", status: "Pending", isNew: true },
    { id: 2, student: "Bob Smith", topic: "OOP Basics", date: "2024-12-07", status: "Accepted", isNew: false },
    { id: 3, student: "Charlie Brown", topic: "Loops", date: "2024-12-06", status: "Declined", isNew: false },
    { id: 4, student: "David Lee", topic: "Functions in C", date: "2024-12-05", status: "Pending", isNew: true },
  ]);

  const handleAction = (id, action) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: action, isNew: false } : req
      )
    );
    setSelectedRequest(null); // Close modal if open
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-richblue-800 border-r border-richblack-700">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Requests</h1>
        
        {/* Requests List */}
        <div className="bg-white rounded-lg shadow p-6">
          {requests.length > 0 ? (
            <ul className="space-y-4">
              {requests.map((request) => (
                <li
                  key={request.id}
                  className={`flex items-center justify-between border-b pb-2 ${
                    request.isNew ? "bg-yellow-100 border-yellow-300" : ""
                  }`}
                >
                  <div>
                    <p className="text-gray-800 font-semibold">{request.student}</p>
                    <p className="text-gray-600 text-sm">
                      Topic: {request.topic} | Date: {request.date}
                    </p>
                    <p className={`mt-1 text-sm font-medium ${
                      request.status === "Accepted"
                        ? "text-green-600"
                        : request.status === "Declined"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}>
                      Status: {request.status}
                    </p>
                  </div>
                  <div className="space-x-2">
                    { request.status !== 'Pending' &&(
                      <>
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                        >
                          View Request
                        </button>

                      </>
                    )}
                    
                    {request.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAction(request.id, "Accepted")}
                          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(request.id, "Declined")}
                          className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No requests available.</p>
          )}
        </div>
      </div>

      {/* View Request Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Details</h2>
            <p className="mb-2"><strong>Student:</strong> {selectedRequest.student}</p>
            <p className="mb-2"><strong>Topic:</strong> {selectedRequest.topic}</p>
            <p className="mb-2"><strong>Date:</strong> {selectedRequest.date}</p>
            <p className="mb-4"><strong>Status:</strong> {selectedRequest.status}</p>
            <div className="text-right space-x-2">
              {selectedRequest.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleAction(selectedRequest.id, "Accepted")}
                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(selectedRequest.id, "Declined")}
                    className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
                  >
                    Decline
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
