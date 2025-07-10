document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const resumeForm = document.getElementById('resumeForm');
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const addSkillBtn = document.getElementById('addSkill');
    const addProjectBtn = document.getElementById('addProject');
    const addCertificationBtn = document.getElementById('addCertification');
    const previewBtn = document.getElementById('previewBtn');
    const saveBtn = document.getElementById('saveBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const templateSelect = document.getElementById('templateSelect');
    const resumePreview = document.getElementById('resumePreview');

    // Load saved data if exists
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        populateForm(formData);
        updatePreview();
    }

    // Add education entry
    addEducationBtn.addEventListener('click', function() {
        const educationEntries = document.getElementById('educationEntries');
        const newEntry = document.createElement('div');
        newEntry.className = 'education-entry entry-item';
        newEntry.innerHTML = `
            <div class="form-row">
                <div class="form-control">
                    <label>Degree*</label>
                    <input type="text" name="degree[]" required>
                </div>
                <div class="form-control">
                    <label>University*</label>
                    <input type="text" name="university[]" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-control">
                    <label>Year*</label>
                    <input type="text" name="educationYear[]" required>
                </div>
                <div class="form-control">
                    <label>GPA</label>
                    <input type="text" name="gpa[]">
                </div>
            </div>
            <div class="form-control">
                <label>Description</label>
                <textarea name="educationDescription[]" rows="2"></textarea>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        educationEntries.appendChild(newEntry);
        addRemoveListener(newEntry);
    });

    // Add experience entry
    addExperienceBtn.addEventListener('click', function() {
        const experienceEntries = document.getElementById('experienceEntries');
        const newEntry = document.createElement('div');
        newEntry.className = 'experience-entry entry-item';
        newEntry.innerHTML = `
            <div class="form-row">
                <div class="form-control">
                    <label>Job Title*</label>
                    <input type="text" name="jobTitle[]" required>
                </div>
                <div class="form-control">
                    <label>Company*</label>
                    <input type="text" name="company[]" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-control">
                    <label>Start Date*</label>
                    <input type="text" name="startDate[]" placeholder="MM/YYYY" required>
                </div>
                <div class="form-control">
                    <label>End Date</label>
                    <input type="text" name="endDate[]" placeholder="MM/YYYY or Present">
                </div>
            </div>
            <div class="form-control">
                <label>Description*</label>
                <textarea name="jobDescription[]" rows="3" required></textarea>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        experienceEntries.appendChild(newEntry);
        addRemoveListener(newEntry);
    });

    // Add skill entry
    addSkillBtn.addEventListener('click', function() {
        const skillEntries = document.getElementById('skillEntries');
        const newEntry = document.createElement('div');
        newEntry.className = 'skill-entry entry-item';
        newEntry.innerHTML = `
            <div class="form-row">
                <div class="form-control">
                    <label>Skill Name*</label>
                    <input type="text" name="skillName[]" required>
                </div>
                <div class="form-control skill-level">
                    <label>Skill Level</label>
                    <select name="skillLevel[]">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        skillEntries.appendChild(newEntry);
        addRemoveListener(newEntry);
    });

    // Add project entry
    addProjectBtn.addEventListener('click', function() {
        const projectEntries = document.getElementById('projectEntries');
        const newEntry = document.createElement('div');
        newEntry.className = 'project-entry entry-item';
        newEntry.innerHTML = `
            <div class="form-row">
                <div class="form-control">
                    <label>Project Name*</label>
                    <input type="text" name="projectName[]" required>
                </div>
                <div class="form-control">
                    <label>Technologies Used</label>
                    <input type="text" name="technologies[]">
                </div>
            </div>
            <div class="form-control">
                <label>Description*</label>
                <textarea name="projectDescription[]" rows="3" required></textarea>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        projectEntries.appendChild(newEntry);
        addRemoveListener(newEntry);
    });

    // Add certification entry
    addCertificationBtn.addEventListener('click', function() {
        const certificationEntries = document.getElementById('certificationEntries');
        const newEntry = document.createElement('div');
        newEntry.className = 'certification-entry entry-item';
        newEntry.innerHTML = `
            <div class="form-row">
                <div class="form-control">
                    <label>Certification Name*</label>
                    <input type="text" name="certificationName[]" required>
                </div>
                <div class="form-control">
                    <label>Issuing Organization</label>
                    <input type="text" name="issuingOrg[]">
                </div>
            </div>
            <div class="form-row">
                <div class="form-control">
                    <label>Date Earned</label>
                    <input type="text" name="certDate[]" placeholder="MM/YYYY">
                </div>
                <div class="form-control">
                    <label>Credential URL</label>
                    <input type="url" name="credentialUrl[]">
                </div>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        certificationEntries.appendChild(newEntry);
        addRemoveListener(newEntry);
    });

    // Add remove button functionality
    function addRemoveListener(element) {
        const removeBtn = element.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            element.remove();
            updatePreview();
        });
    }

    // Initialize remove buttons for existing entries
    document.querySelectorAll('.entry-item').forEach(item => {
        addRemoveListener(item);
    });

    // Save form data to localStorage
    saveBtn.addEventListener('click', function() {
        const formData = getFormData();
        localStorage.setItem('resumeData', JSON.stringify(formData));
        alert('Your progress has been saved!');
    });

    // Preview button
    previewBtn.addEventListener('click', function() {
        if (resumeForm.checkValidity()) {
            const formData = getFormData();
            localStorage.setItem('resumeData', JSON.stringify(formData));
            localStorage.setItem('selectedTemplate', templateSelect.value);
            window.location.href = 'preview.html';
        } else {
            alert('Please fill in all required fields before previewing.');
        }
    });

    // Download as PDF
    downloadBtn.addEventListener('click', function() {
        generatePDF();
    });

    // Template selection change
    templateSelect.addEventListener('change', function() {
        updatePreview();
    });

    // Update preview on form changes
    resumeForm.addEventListener('input', function() {
        updatePreview();
    });

    // Get form data as object
    function getFormData() {
        const formData = {
            personalInfo: {
                fullName: document.getElementById('fullName').value,
                profession: document.getElementById('profession').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                linkedin: document.getElementById('linkedin').value,
                github: document.getElementById('github').value,
                portfolio: document.getElementById('portfolio').value
            },
            education: [],
            experience: [],
            skills: [],
            projects: [],
            certifications: []
        };

        // Get education entries
        document.querySelectorAll('.education-entry').forEach(entry => {
            formData.education.push({
                degree: entry.querySelector('input[name="degree[]"]').value,
                university: entry.querySelector('input[name="university[]"]').value,
                year: entry.querySelector('input[name="educationYear[]"]').value,
                gpa: entry.querySelector('input[name="gpa[]"]').value,
                description: entry.querySelector('textarea[name="educationDescription[]"]').value
            });
        });

        // Get experience entries
        document.querySelectorAll('.experience-entry').forEach(entry => {
            formData.experience.push({
                jobTitle: entry.querySelector('input[name="jobTitle[]"]').value,
                company: entry.querySelector('input[name="company[]"]').value,
                startDate: entry.querySelector('input[name="startDate[]"]').value,
                endDate: entry.querySelector('input[name="endDate[]"]').value,
                description: entry.querySelector('textarea[name="jobDescription[]"]').value
            });
        });

        // Get skill entries
        document.querySelectorAll('.skill-entry').forEach(entry => {
            formData.skills.push({
                name: entry.querySelector('input[name="skillName[]"]').value,
                level: entry.querySelector('select[name="skillLevel[]"]').value
            });
        });

        // Get project entries
        document.querySelectorAll('.project-entry').forEach(entry => {
            formData.projects.push({
                name: entry.querySelector('input[name="projectName[]"]').value,
                technologies: entry.querySelector('input[name="technologies[]"]').value,
                description: entry.querySelector('textarea[name="projectDescription[]"]').value
            });
        });

        // Get certification entries
        document.querySelectorAll('.certification-entry').forEach(entry => {
            formData.certifications.push({
                name: entry.querySelector('input[name="certificationName[]"]').value,
                organization: entry.querySelector('input[name="issuingOrg[]"]').value,
                date: entry.querySelector('input[name="certDate[]"]').value,
                url: entry.querySelector('input[name="credentialUrl[]"]').value
            });
        });

        return formData;
    }

    // Populate form from saved data
    function populateForm(data) {
        // Personal info
        document.getElementById('fullName').value = data.personalInfo.fullName || '';
        document.getElementById('profession').value = data.personalInfo.profession || '';
        document.getElementById('email').value = data.personalInfo.email || '';
        document.getElementById('phone').value = data.personalInfo.phone || '';
        document.getElementById('address').value = data.personalInfo.address || '';
        document.getElementById('linkedin').value = data.personalInfo.linkedin || '';
        document.getElementById('github').value = data.personalInfo.github || '';
        document.getElementById('portfolio').value = data.personalInfo.portfolio || '';

        // Education
        const educationEntries = document.getElementById('educationEntries');
        educationEntries.innerHTML = '';
        data.education.forEach(edu => {
            const newEntry = document.createElement('div');
            newEntry.className = 'education-entry entry-item';
            newEntry.innerHTML = `
                <div class="form-row">
                    <div class="form-control">
                        <label>Degree*</label>
                        <input type="text" name="degree[]" value="${edu.degree || ''}" required>
                    </div>
                    <div class="form-control">
                        <label>University*</label>
                        <input type="text" name="university[]" value="${edu.university || ''}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-control">
                        <label>Year*</label>
                        <input type="text" name="educationYear[]" value="${edu.year || ''}" required>
                    </div>
                    <div class="form-control">
                        <label>GPA</label>
                        <input type="text" name="gpa[]" value="${edu.gpa || ''}">
                    </div>
                </div>
                <div class="form-control">
                    <label>Description</label>
                    <textarea name="educationDescription[]" rows="2">${edu.description || ''}</textarea>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            `;
            educationEntries.appendChild(newEntry);
            addRemoveListener(newEntry);
        });

        // Experience
        const experienceEntries = document.getElementById('experienceEntries');
        experienceEntries.innerHTML = '';
        data.experience.forEach(exp => {
            const newEntry = document.createElement('div');
            newEntry.className = 'experience-entry entry-item';
            newEntry.innerHTML = `
                <div class="form-row">
                    <div class="form-control">
                        <label>Job Title*</label>
                        <input type="text" name="jobTitle[]" value="${exp.jobTitle || ''}" required>
                    </div>
                    <div class="form-control">
                        <label>Company*</label>
                        <input type="text" name="company[]" value="${exp.company || ''}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-control">
                        <label>Start Date*</label>
                        <input type="text" name="startDate[]" value="${exp.startDate || ''}" placeholder="MM/YYYY" required>
                    </div>
                    <div class="form-control">
                        <label>End Date</label>
                        <input type="text" name="endDate[]" value="${exp.endDate || ''}" placeholder="MM/YYYY or Present">
                    </div>
                </div>
                <div class="form-control">
                    <label>Description*</label>
                    <textarea name="jobDescription[]" rows="3" required>${exp.description || ''}</textarea>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            `;
            experienceEntries.appendChild(newEntry);
            addRemoveListener(newEntry);
        });

        // Skills
        const skillEntries = document.getElementById('skillEntries');
        skillEntries.innerHTML = '';
        data.skills.forEach(skill => {
            const newEntry = document.createElement('div');
            newEntry.className = 'skill-entry entry-item';
            newEntry.innerHTML = `
                <div class="form-row">
                    <div class="form-control">
                        <label>Skill Name*</label>
                        <input type="text" name="skillName[]" value="${skill.name || ''}" required>
                    </div>
                    <div class="form-control skill-level">
                        <label>Skill Level</label>
                        <select name="skillLevel[]">
                            <option value="beginner" ${skill.level === 'beginner' ? 'selected' : ''}>Beginner</option>
                            <option value="intermediate" ${skill.level === 'intermediate' ? 'selected' : ''}>Intermediate</option>
                            <option value="advanced" ${skill.level === 'advanced' ? 'selected' : ''}>Advanced</option>
                            <option value="expert" ${skill.level === 'expert' ? 'selected' : ''}>Expert</option>
                        </select>
                    </div>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            `;
            skillEntries.appendChild(newEntry);
            addRemoveListener(newEntry);
        });

        // Projects
        const projectEntries = document.getElementById('projectEntries');
        projectEntries.innerHTML = '';
        data.projects.forEach(project => {
            const newEntry = document.createElement('div');
            newEntry.className = 'project-entry entry-item';
            newEntry.innerHTML = `
                <div class="form-row">
                    <div class="form-control">
                        <label>Project Name*</label>
                        <input type="text" name="projectName[]" value="${project.name || ''}" required>
                    </div>
                    <div class="form-control">
                        <label>Technologies Used</label>
                        <input type="text" name="technologies[]" value="${project.technologies || ''}">
                    </div>
                </div>
                <div class="form-control">
                    <label>Description*</label>
                    <textarea name="projectDescription[]" rows="3" required>${project.description || ''}</textarea>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            `;
            projectEntries.appendChild(newEntry);
            addRemoveListener(newEntry);
        });

        // Certifications
        const certificationEntries = document.getElementById('certificationEntries');
        certificationEntries.innerHTML = '';
        data.certifications.forEach(cert => {
            const newEntry = document.createElement('div');
            newEntry.className = 'certification-entry entry-item';
            newEntry.innerHTML = `
                <div class="form-row">
                    <div class="form-control">
                        <label>Certification Name*</label>
                        <input type="text" name="certificationName[]" value="${cert.name || ''}" required>
                    </div>
                    <div class="form-control">
                        <label>Issuing Organization</label>
                        <input type="text" name="issuingOrg[]" value="${cert.organization || ''}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-control">
                        <label>Date Earned</label>
                        <input type="text" name="certDate[]" value="${cert.date || ''}" placeholder="MM/YYYY">
                    </div>
                    <div class="form-control">
                        <label>Credential URL</label>
                        <input type="url" name="credentialUrl[]" value="${cert.url || ''}">
                    </div>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            `;
            certificationEntries.appendChild(newEntry);
            addRemoveListener(newEntry);
        });
    }

    // Update resume preview
    function updatePreview() {
        const formData = getFormData();
        const template = templateSelect.value;
        
        // Clear previous preview classes
        resumePreview.className = 'resume-preview';
        resumePreview.classList.add(template);
        
        // Generate HTML for preview
        let previewHTML = `
            <div class="resume-header">
                <h2>${formData.personalInfo.fullName || 'Your Name'}</h2>
                <p>${formData.personalInfo.profession || 'Your Profession'}</p>
                <div class="contact-info">
                    ${formData.personalInfo.email ? `<div><i class="fas fa-envelope"></i> ${formData.personalInfo.email}</div>` : ''}
                    ${formData.personalInfo.phone ? `<div><i class="fas fa-phone"></i> ${formData.personalInfo.phone}</div>` : ''}
                    ${formData.personalInfo.address ? `<div><i class="fas fa-map-marker-alt"></i> ${formData.personalInfo.address}</div>` : ''}
                    ${formData.personalInfo.linkedin ? `<div><i class="fab fa-linkedin"></i> ${formData.personalInfo.linkedin}</div>` : ''}
                    ${formData.personalInfo.github ? `<div><i class="fab fa-github"></i> ${formData.personalInfo.github}</div>` : ''}
                </div>
            </div>
        `;

        // Education section
        if (formData.education.length > 0) {
            previewHTML += `<div class="resume-section">
                <h3>Education</h3>`;
            
            formData.education.forEach(edu => {
                previewHTML += `
                    <div class="education-item">
                        <div class="section-title">${edu.degree || 'Degree'}</div>
                        <div class="section-subtitle">
                            <span>${edu.university || 'University'}</span>
                            <span>${edu.year || 'Year'}</span>
                        </div>
                        ${edu.gpa ? `<div class="section-description">GPA: ${edu.gpa}</div>` : ''}
                        ${edu.description ? `<div class="section-description">${edu.description}</div>` : ''}
                    </div>
                `;
            });
            
            previewHTML += `</div>`;
        }

        // Experience section
        if (formData.experience.length > 0) {
            previewHTML += `<div class="resume-section">
                <h3>Work Experience</h3>`;
            
            formData.experience.forEach(exp => {
                previewHTML += `
                    <div class="experience-item">
                        <div class="section-title">${exp.jobTitle || 'Job Title'}</div>
                        <div class="section-subtitle">
                            <span>${exp.company || 'Company'}</span>
                            <span>${exp.startDate || 'Start'} - ${exp.endDate || 'Present'}</span>
                        </div>
                        ${exp.description ? `<div class="section-description">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
                    </div>
                `;
            });
            
            previewHTML += `</div>`;
        }

        // Skills section
        if (formData.skills.length > 0) {
            previewHTML += `<div class="resume-section">
                <h3>Skills</h3>
                <div class="skills-list">`;
            
            formData.skills.forEach(skill => {
                previewHTML += `<div class="skill-item">${skill.name || 'Skill'}</div>`;
            });
            
            previewHTML += `</div></div>`;
        }

        // Projects section
        if (formData.projects.length > 0) {
            previewHTML += `<div class="resume-section">
                <h3>Projects</h3>`;
            
            formData.projects.forEach(project => {
                previewHTML += `
                    <div class="project-item">
                        <div class="section-title">${project.name || 'Project Name'}</div>
                        ${project.technologies ? `<div class="section-subtitle">Technologies: ${project.technologies}</div>` : ''}
                        ${project.description ? `<div class="section-description">${project.description.replace(/\n/g, '<br>')}</div>` : ''}
                    </div>
                `;
            });
            
            previewHTML += `</div>`;
        }

        // Certifications section
        if (formData.certifications.length > 0) {
            previewHTML += `<div class="resume-section">
                <h3>Certifications</h3>`;
            
            formData.certifications.forEach(cert => {
                previewHTML += `
                    <div class="certification-item">
                        <div class="section-title">${cert.name || 'Certification'}</div>
                        <div class="section-subtitle">
                            <span>${cert.organization || 'Issuing Organization'}</span>
                            <span>${cert.date || 'Date Earned'}</span>
                        </div>
                        ${cert.url ? `<div class="section-description"><a href="${cert.url}" target="_blank">View Credential</a></div>` : ''}
                    </div>
                `;
            });
            
            previewHTML += `</div>`;
        }

        resumePreview.innerHTML = previewHTML;
        downloadBtn.disabled = false;
    }

    // Generate PDF from resume
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Get the resume preview element
        const element = document.getElementById('resumePreview');
        
        // Use html2canvas to capture the element
        html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = doc.internal.pageSize.getWidth() - 20;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            doc.save('resume.pdf');
        });
    }

    // Initialize preview
    updatePreview();
});
