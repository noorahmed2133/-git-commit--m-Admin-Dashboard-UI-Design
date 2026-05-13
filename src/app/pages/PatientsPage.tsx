import { useState } from 'react';
import { Eye, UserRound } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  status: 'Active' | 'Pending' | 'Blocked';
  avatar: string;
  phone: string;
  lastVisit: string;
  condition: string;
}

const patients: Patient[] = [
  {
    id: 1,
    name: 'Emily Rodriguez',
    age: 34,
    gender: 'Female',
    bloodType: 'O+',
    status: 'Active',
    avatar: 'ER',
    phone: '+1 234-567-2001',
    lastVisit: '2026-04-18',
    condition: 'Routine Checkup',
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    age: 28,
    gender: 'Female',
    bloodType: 'A+',
    status: 'Active',
    avatar: 'ST',
    phone: '+1 234-567-2002',
    lastVisit: '2026-04-15',
    condition: 'Flu Symptoms',
  },
  {
    id: 3,
    name: 'Robert Martinez',
    age: 56,
    gender: 'Male',
    bloodType: 'B+',
    status: 'Blocked',
    avatar: 'RM',
    phone: '+1 234-567-2003',
    lastVisit: '2026-03-10',
    condition: 'Hypertension',
  },
  {
    id: 4,
    name: 'Jennifer Davis',
    age: 42,
    gender: 'Female',
    bloodType: 'AB-',
    status: 'Active',
    avatar: 'JD',
    phone: '+1 234-567-2004',
    lastVisit: '2026-04-20',
    condition: 'Diabetes Follow-up',
  },
];

export function PatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-800 mb-1">Patients Management</h1>
        <p className="text-sm text-gray-500">View and manage patient records</p>
      </div>

      <Card>
        {patients.length === 0 ? (
          <EmptyState
            icon={<UserRound size={32} />}
            title="No patients found"
            description="Patient records will appear here"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Patient</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Age</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Gender</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Blood Type</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Last Visit</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm">
                          {patient.avatar}
                        </div>
                        <div>
                          <p className="text-sm">{patient.name}</p>
                          <p className="text-xs text-gray-500">{patient.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{patient.age}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{patient.gender}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{patient.bloodType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{patient.lastVisit}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={patient.status}>{patient.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(patient)}>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Patient Details"
        size="md"
      >
        {selectedPatient && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl">
                {selectedPatient.avatar}
              </div>
              <div>
                <h3 className="text-lg mb-1">{selectedPatient.name}</h3>
                <p className="text-sm text-gray-600">{selectedPatient.age} years old • {selectedPatient.gender}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                <p className="text-sm">{selectedPatient.bloodType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm">{selectedPatient.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Last Visit</p>
                <p className="text-sm">{selectedPatient.lastVisit}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <Badge status={selectedPatient.status}>{selectedPatient.status}</Badge>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Current Condition</p>
                <p className="text-sm">{selectedPatient.condition}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <Button className="w-full">Schedule Appointment</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
