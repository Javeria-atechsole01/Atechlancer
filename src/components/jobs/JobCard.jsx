import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-navy-900 mb-1">
            <Link to={`/jobs/${job._id}`} className="hover:text-primary-600 transition-colors">
              {job.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            {job.employerId?.name || 'Unknown Company'}
          </p>
        </div>
        <span className="bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
          {job.category}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills && job.skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
            {skill}
          </span>
        ))}
        {job.skills && job.skills.length > 3 && (
          <span className="text-gray-400 text-xs py-1">+{job.skills.length - 3} more</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <DollarSign size={16} />
            <span className="font-semibold text-navy-900">${job.budget}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to={`/jobs/${job._id}`} className="text-primary-600 font-semibold hover:underline">
            View Details
          </Link>
          <button
            className="btn btn-primary"
            style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            onClick={() => navigate(`/jobs/${job._id}/apply`)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
