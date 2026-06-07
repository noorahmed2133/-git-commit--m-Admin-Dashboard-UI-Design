import { useState } from 'react';
import { Eye, UserRound } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { usePatients } from '../hooks/useApi';

export function PatientsPage() {
  const { data, loading, error } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const patients: any[] = data?.data ?? [];

  const handleViewDetails = (patient: any) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const getAvatar = (patient: any) => {
    const name = patient.userId?.fullName || 'P';
    return name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="animate-pulse h-16 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-800 mb-1">Patients Management</h1>
        <p className="text-sm text-gray-500">View and manage patient records</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

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
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Blood Type</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Height</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Weight</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Allergies</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient: any) => (
                  <tr key={patient._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm">
                          {getAvatar(patient)}
                        </div>
                        <div>
                          <p className="text-sm">{patient.userId?.fullName || 'Unknown'}</p>
                          <p className="text-xs text-gray-500">{patient.userId?.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-600">{patient.bloodType}</span></td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-600">{patient.height} cm</span></td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-600">{patient.weight} kg</span></td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-600">{patient.allergies}</span></td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(patient)}>
                        <Eye size={14} className="mr-1" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Patient Details" size="md">
        {selectedPatient && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl">
                {getAvatar(selectedPatient)}
              </div>
              <div>
                <h3 className="text-lg mb-1">{selectedPatient.userId?.fullName || 'Unknown'}</h3>
                <p className="text-sm text-gray-600">{selectedPatient.userId?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                <p className="text-sm">{selectedPatient.bloodType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm">{selectedPatient.userId?.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Height</p>
                <p className="text-sm">{selectedPatient.height} cm</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Weight</p>
                <p className="text-sm">{selectedPatient.weight} kg</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Allergies</p>
                <p className="text-sm">{selectedPatient.allergies}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Chronic Diseases</p>
                <p className="text-sm">
                  {selectedPatient.chronicDiseases?.length > 0
                    ? selectedPatient.chronicDiseases.map((d: any) => d.name).join(', ')
                    : 'None'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}