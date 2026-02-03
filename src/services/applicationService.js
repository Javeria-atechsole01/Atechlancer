import api from './api';

export const applicationService = {
  apply: async (jobId, { coverLetter, expectedRate, portfolioUrl, resumeFile }) => {
    const fd = new FormData();
    if (coverLetter !== undefined) fd.append('coverLetter', coverLetter);
    if (expectedRate !== undefined) fd.append('expectedRate', expectedRate);
    if (portfolioUrl !== undefined) fd.append('portfolioUrl', portfolioUrl);
    if (resumeFile) fd.append('resume', resumeFile);
    const res = await api.post(`/jobs/${jobId}/applications`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  myApplications: async () => {
    const res = await api.get('/my/applications');
    return res.data;
  },
  jobApplications: async (jobId, { status }) => {
    const res = await api.get(`/jobs/${jobId}/applications`, { params: { status } });
    return res.data;
  },
  updateStatus: async (applicationId, status) => {
    const res = await api.patch(`/applications/${applicationId}/status`, { status });
    return res.data;
  },
  employerSummary: async () => {
    const res = await api.get('/employer/applications/summary');
    return res.data;
  }
};
