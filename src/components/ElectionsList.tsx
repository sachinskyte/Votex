import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin } from 'lucide-react';

const ElectionsList = () => {
  // Indian PM election with enhanced data
  const indianPMElection = {
    id: 1,
    title: "Indian Prime Minister General Election 2025",
    description: "Vote for the next Prime Minister of India. This crucial election will determine the leadership of India for the next 5 years, influencing national policies and international relations.",
    start_date: "2025-05-10",
    end_date: "2025-05-10",
    status: "active",
    location: "All India",
    candidates_count: 10,
    constituencies_count: 543
  };
  
  return (
    <div>
      <Card 
        className="w-full border border-[#6D28D9]/30 bg-[#0D0D0D] shadow-[0_0_10px_rgba(109,40,217,0.15)] hover:shadow-[0_0_15px_rgba(109,40,217,0.25)] transition-all"
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-[#6D28D9] text-xl">{indianPMElection.title}</CardTitle>
              <CardDescription className="mt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{new Date(indianPMElection.start_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </CardDescription>
            </div>
            <div className="px-2 py-1 bg-[#2D1B69] text-[#A78BFA] text-xs rounded-full">
              Active
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">{indianPMElection.description}</p>
          <div className="grid grid-cols-3 gap-4 my-4">
            <div className="bg-[#15121E] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-[#6D28D9]" />
                <span className="text-gray-400 text-sm">Location</span>
              </div>
              <p className="text-white font-medium">{indianPMElection.location}</p>
            </div>
            <div className="bg-[#15121E] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-[#6D28D9]" />
                <span className="text-gray-400 text-sm">Candidates</span>
              </div>
              <p className="text-white font-medium">{indianPMElection.candidates_count} Candidates</p>
            </div>
            <div className="bg-[#15121E] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-[#6D28D9]" />
                <span className="text-gray-400 text-sm">Constituencies</span>
              </div>
              <p className="text-white font-medium">{indianPMElection.constituencies_count} Constituencies</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="default" className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white">
            <Link to={`/candidates/${indianPMElection.id}`}>View Candidates</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ElectionsList; 