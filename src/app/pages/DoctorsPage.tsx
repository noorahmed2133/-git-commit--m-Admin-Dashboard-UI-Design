import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Stethoscope } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  license: string;
  status: 'Active' | 'Pending' | 'Blocked';
  avatar: string;
  email: string;
  phone: string;
}

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Amanda Foster',
    specialty: 'Cardiology',
    experience: '12 years',
    license: 'MD-2024-5678',
    status: 'Pending',
    avatar: 'AF',
    email: 'amanda.f@medpal.com',
    phone: '+1 234-567-1001',
  },
  {
    id: 2,
    name: 'Dr. Kevin Park',
    specialty: 'Neurology',
    experience: '8 years',
    license: 'MD-2024-9012',
    status: 'Pending',
    avatar: 'KP',
    email: 'kevin.p@medpal.com',
    phone: '+1 234-567-1002',
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    specialty: 'General Medicine',
    experience: '15 years',
    license: 'MD-2023-1234',
    status: 'Active',
    avatar: 'MC',
    email: 'michael.c@medpal.com',
    phone: '+1 234-567-1003',
  },
  {
    id: 4,
    name: 'Dr. Sarah Williams',
    specialty: 'Pediatrics',
    experience: '10 years',
    license: 'MD-2023-5678',
    status: 'Active',
    avatar: 'SW',
    email: 'sarah.w@medpal.com',
    phone: '+1 234-567-1004',
  },
];

export function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = (id: number) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, status: 'Active' as const } : d));
  };

  const handleReject = (id: number) => {
    if (confirm('Are you sure you want to reject this doctor?')) {
      setDoctors(doctors.map(d => d.id === id ? { ...d, status: 'Blocked' as const } : d));
    }
  };

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const pendingDoctors = doctors.filter(d => d.status === 'Pending');
  const activeDoctors = doctors.filter(d => d.status === 'Active');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-800 mb-1">Doctors Management</h1>
        <p className="text-sm text-gray-500">Approve and manage doctor registrations</p>
      </div>

      {pendingDoctors.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg text-gray-800 mb-4">Pending Approvals ({pendingDoctors.length})</h2>
          <Card>
            <div className="p-6 space-y-4">
              {pendingDoctors.map((doctor) => (
                <div key={doctor.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {doctor.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm mb-1">{doctor.name}</h3>
                          <p className="text-xs text-gray-600">{doctor.specialty} • {doctor.experience} experience</p>
                          <p className="text-xs text-gray-500 mt-1">License: {doctor.license}</p>
                        </div>
                        <Badge status="Pending">Pending</Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => handleViewDetails(doctor)}>
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="success" onClick={() => handleApprove(doctor.id)}>
                          <CheckCircle size={14} className="mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleReject(doctor.id)}>
                          <XCircle size={14} className="mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <div>
        <h2 className="text-lg text-gray-800 mb-4">Active Doctors ({activeDoctors.length})</h2>
        <Card>
          {activeDoctors.length === 0 ? (
            <EmptyState
              icon={<Stethoscope size={32} />}
              title="No active doctors"
              description="Approve pending doctors to see them here"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Doctor</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Specialty</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Experience</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">License</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Status</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDoctors.map((doctor) => (
                    <tr key={doctor.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">
                            {doctor.avatar}
                          </div>
                          <span className="text-sm">{doctor.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{doctor.specialty}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{doctor.experience}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{doctor.license}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={doctor.status}>{doctor.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(doctor)}>
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Doctor Details"
        size="md"
      >
        {selectedDoctor && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                {selectedDoctor.avatar}
              </div>
              <div>
                <h3 className="text-lg mb-1">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">License Number</p>
                <p className="text-sm">{selectedDoctor.license}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Experience</p>
                <p className="text-sm">{selectedDoctor.experience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm">{selectedDoctor.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm">{selectedDoctor.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <Badge status={selectedDoctor.status}>{selectedDoctor.status}</Badge>
              </div>
            </div>
            {selectedDoctor.status === 'Pending' && (
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button
                  variant="success"
                  className="flex-1"
                  onClick={() => {
                    handleApprove(selectedDoctor.id);
                    setIsModalOpen(false);
                  }}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Approve
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  onClick={() => {
                    handleReject(selectedDoctor.id);
                    setIsModalOpen(false);
                  }}
                >
                  <XCircle size={16} className="mr-2" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
