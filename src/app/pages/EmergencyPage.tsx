import { AlertCircle, MapPin, Clock, Phone } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useDashboard } from '../hooks/useApi';

export function EmergencyPage() {
  const { data, loading } = useDashboard();

  const totalSOS = data?.data?.SOS ?? 0;
  const pendingDoctors = data?.data?.pendingDoctors ?? 0;

  const emergencyCases = data?.data?.emergencyCases ?? [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'border-red-500 bg-red-50';
      case 'High': return 'border-orange-500 bg-orange-50';
      case 'Medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="text-red-600" size={24} />
          <h1 className="text-2xl text-red-600">Emergency SOS Dashboard</h1>
        </div>
        <p className="text-sm text-red-700">Critical cases requiring immediate medical attention</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="p-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-red-600" size={32} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total SOS Cases</p>
              <p className="text-4xl text-red-600">
                {loading ? <span className="animate-pulse bg-gray-200 rounded w-16 h-8 inline-block" /> : totalSOS}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-yellow-600" size={32} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Doctors</p>
              <p className="text-4xl text-yellow-600">
                {loading ? <span className="animate-pulse bg-gray-200 rounded w-16 h-8 inline-block" /> : pendingDoctors}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {emergencyCases.length === 0 ? (
        <Card>
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-green-500" size={40} />
            </div>
            <h2 className="text-lg text-gray-700 mb-2">No Active Emergency Cases</h2>
            <p className="text-sm text-gray-500">All emergency cases have been resolved</p>
            <div className="mt-4 px-4 py-2 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Total SOS reported: <span className="font-semibold">{totalSOS}</span></p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {emergencyCases.map((emergency: any) => (
            <Card key={emergency._id || emergency.id} className={`border-l-4 ${getPriorityColor(emergency.priority)}`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-red-600" size={20} />
                      <h3 className="text-lg">{emergency.patient || emergency.patientName}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{emergency.type}</p>
                  </div>
                  <Badge status={emergency.priority}>{emergency.priority}</Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{emergency.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{emergency.time}</span>
                  </div>
                  {emergency.contactNumber && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} />
                      <span>{emergency.contactNumber}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="danger" className="flex-1">
                    <AlertCircle size={16} className="mr-2" />
                    Respond Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Card>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg">Emergency Response Team</h2>
            <p className="text-sm text-gray-500 mt-1">Available medical personnel</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { initials: 'DR', name: 'Dr. Robert Kim', role: 'Emergency Medicine' },
                { initials: 'JC', name: 'Nurse Jane Cooper', role: 'ICU Specialist' },
                { initials: 'MJ', name: 'Paramedic Mike Johnson', role: 'First Responder' },
              ].map((member) => (
                <div key={member.name} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.role}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}