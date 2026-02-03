import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../../services/jobService';
import { Loader2 } from 'lucide-react';

const EmployerPostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    budget: '',
    description: '',
    skills: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: formData.title.trim(),
        category: formData.category,
        budget: Number(formData.budget),
        description: formData.description.trim(),
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      };
      const job = await jobService.create(payload);
      navigate(`/jobs/${job._id}`);
    } catch (err) {
      alert('Failed to create job');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Post a New Job</h1>
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="search-input w-full"
              placeholder="e.g. Senior React Developer needed"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="search-input w-full"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div>
              <label className="form-label">Budget ($)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="search-input w-full"
                placeholder="500"
                min="1"
              />
            </div>
          </div>
          <div>
            <label className="form-label">Required Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="search-input w-full"
              placeholder="React, Node.js, AWS, TypeScript"
            />
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="search-input w-full"
              rows="5"
              placeholder="Detailed job description..."
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Publish Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerPostJob;
