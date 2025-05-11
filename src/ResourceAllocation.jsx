import React, { useState } from "react";
import "./ResourceAllocation.css";

const ResourceAllocation = () => {
  const [resources, setResources] = useState([
    { id: 1, name: "Ambulance", type: "Vehicle", status: "Available" },
    { id: 2, name: "Medical Kits", type: "Supply", status: "Allocated" },
    { id: 3, name: "Volunteers", type: "Personnel", status: "In Use" },
  ]);

  const handleAllocateResource = (id) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id ? { ...resource, status: "Allocated" } : resource
      )
    );
  };

  const handleMarkInUse = (id) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id ? { ...resource, status: "In Use" } : resource
      )
    );
  };

  const handleMarkAvailable = (id) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id ? { ...resource, status: "Available" } : resource
      )
    );
  };

  return (
    <div className="resource-allocation">
      <h2>Resource Allocation</h2>
      <p>Manage resources effectively for disaster response:</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td>{resource.name}</td>
              <td>{resource.type}</td>
              <td>{resource.status}</td>
              <td>
                <button onClick={() => handleAllocateResource(resource.id)}>
                  Allocate
                </button>
                <button onClick={() => handleMarkInUse(resource.id)}>
                  Mark In Use
                </button>
                <button onClick={() => handleMarkAvailable(resource.id)}>
                  Mark Available
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceAllocation;
