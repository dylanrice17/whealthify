// AssessmentService.js
// LocalStorage-based service for health assessments

const STORAGE_KEY = 'whealthify_assessments';

function getAllAssessments() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveAllAssessments(assessments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
}

export function addAssessment(assessment) {
  const assessments = getAllAssessments();
  assessments.push(assessment);
  saveAllAssessments(assessments);
}

export function updateAssessment(id, updates) {
  const assessments = getAllAssessments();
  const idx = assessments.findIndex(a => a.id === id);
  if (idx !== -1) {
    assessments[idx] = { ...assessments[idx], ...updates };
    saveAllAssessments(assessments);
  }
}

export function getAssessmentsByUser(email) {
  return getAllAssessments().filter(a => a.userEmail === email);
}

export function getAllAssessmentsForDoctor() {
  return getAllAssessments();
}

export function getAssessmentById(id) {
  return getAllAssessments().find(a => a.id === id);
} 