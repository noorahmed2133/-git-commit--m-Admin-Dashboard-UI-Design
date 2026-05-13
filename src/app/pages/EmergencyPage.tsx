import { AlertCircle, MapPin, Clock, Phone } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';

interface EmergencyCase {
  id: number;
  patient: string;
  type: string;
  location: string;
  time: string;
  priority: 'Critical' | 'High' | 'Medium';
  contactNumber: string;
  description: string;
}

const emergencyCases: EmergencyCase[] = [
  {
    id: 1,
    patient: 'John Anderson',
    type: 'Cardiac Emergency',
    location: 'Room 305, Building A',
    time: '2 mins ago',
    priority: 'Critical',
    contactNumber: '+1 234-567-3001',
    description: 'Patient experiencing severe chest pain and shortness of breath',
  },
  {
    id: 2,
    patient: 'Maria Garcia',
    type: 'Respiratory Distress',
    location: 'ICU Ward 2',
    time: '8 mins ago',
    priority: 'High',
    contactNumber: '+1 234-567-3002',
    description: 'Difficulty breathing, oxygen saturation dropping',
  },
  {
    id: 3,
    patient: 'Thomas Lee',
    type: 'Severe Pain',
    location: 'Emergency Room 1',
    time: '15 mins ago',
    priority: 'Medium',
    contactNumber: '+1 234-567-3003',
    description: 'Acute abdominal pain, requires immediate assessment',
  },
];

export function EmergencyPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'border-red-500 bg-red-50';
      case 'High':
        return 'border-orange-500 bg-orange-50';
      case 'Medium':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-500 bg-gray-50';
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

      {emergencyCases.length === 0 ? (
        <Card>
          <EmptyState
            icon={<AlertCircle size={32} />}
            title="No active emergencies"
            description="All emergency cases have been resolved"
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {emergencyCases.map((emergency) => (
            <Card key={emergency.id} className={`border-l-4 ${getPriorityColor(emergency.priority)}`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-red-600" size={20} />
                      <h3 className="text-lg">{emergency.patient}</h3>
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
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} />
                    <span>{emergency.contactNumber}</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg mb-4">
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700">{emergency.description}</p>
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
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                  DR
                </div>
                <div>
                  <p className="text-sm">Dr. Robert Kim</p>
                  <p className="text-xs text-gray-600">Emergency Medicine</p>
                </div>
                <div className="ml-auto">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                  JN
                </div>
                <div>
                  <p className="text-sm">Nurse Jane Cooper</p>
                  <p className="text-xs text-gray-600">ICU Specialist</p>
                </div>
                <div className="ml-auto">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                  MP
                </div>
                <div>
                  <p className="text-sm">Paramedic Mike Johnson</p>
                  <p className="text-xs text-gray-600">First Responder</p>
                </div>
                <div className="ml-auto">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
