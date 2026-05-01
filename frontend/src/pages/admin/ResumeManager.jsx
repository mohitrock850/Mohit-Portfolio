import { useState, useEffect, useRef } from 'react';
import { uploadResume, deleteResume, getResume } from '../../api/adminApi';
import { API_BASE_URL } from '../../api/api';
import { toast, Toaster } from 'react-hot-toast';
import { Upload, Trash2, Download, FileText, RefreshCw } from 'lucide-react';

const ResumeManager = () => {
  const [resume, setResume] = useState(null);   // { url, fileName, updatedAt }
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchResume = async () => {
    try {
      const data = await getResume();
      setResume(data);
    } catch {
      setResume(null); // no resume uploaded yet
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a PDF file first.');
    setUploading(true);
    try {
      const data = await uploadResume(file);
      setResume(data);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      toast.success('Resume uploaded successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete the current resume? Anyone with the link will no longer be able to download it.')) return;
    try {
      await deleteResume();
      setResume(null);
      toast.success('Resume deleted.');
    } catch {
      toast.error('Failed to delete resume.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Resume Manager</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
        Upload your latest resume as a PDF. Visitors can download it from the hero section.
        Uploading a new file automatically replaces the old one.
      </p>

      {/* Current Resume Status */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6 shadow-sm">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          <FileText size={18} className="text-primary-500" />
          Current Resume
        </h3>

        {loading ? (
          <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />
        ) : resume ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{resume.fileName}</p>
              <p className="text-xs text-gray-400 mt-1">
                Last updated: {new Date(resume.updatedAt).toLocaleString('en-IN', {
                  dateStyle: 'medium', timeStyle: 'short',
                })}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href={`${API_BASE_URL}/resume/download`}
                download
                className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Download size={15} /> Download PDF
              </a>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            <FileText size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No resume uploaded yet.</p>
          </div>
        )}
      </div>

      {/* Upload New Resume */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          <Upload size={18} className="text-primary-500" />
          {resume ? 'Replace Resume' : 'Upload Resume'}
        </h3>

        <div className="space-y-4">
          {/* Drop zone */}
          <label
            htmlFor="resume-file"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors group"
          >
            <Upload size={28} className="text-gray-400 group-hover:text-primary-500 mb-2 transition-colors" />
            {file ? (
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{file.name}</span>
            ) : (
              <>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to select PDF</span>
                <span className="text-xs text-gray-400 mt-1">Maximum size: 10 MB</span>
              </>
            )}
            <input
              id="resume-file"
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all shadow-sm"
          >
            {uploading ? (
              <><RefreshCw size={18} className="animate-spin" /> Uploading...</>
            ) : (
              <><Upload size={18} /> {resume ? 'Upload & Replace' : 'Upload Resume'}</>
            )}
          </button>
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default ResumeManager;
