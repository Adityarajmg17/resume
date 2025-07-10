document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const finalResume = document.getElementById('finalResume');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const printBtn = document.getElementById('printBtn');
    const templateCards = document.querySelectorAll('.template-card');
    
    // Check for shared data in URL or load from localStorage
    checkForSharedData();
    
    // Download PDF button
    downloadPdfBtn.addEventListener('click', function() {
        generatePDF();
    });
    
    // Print button
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Template selection
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            const template = card.getAttribute('data-template');
            finalResume.className = 'resume-template';
            finalResume.classList.add(template);
            
            // Save the selected template
            localStorage.setItem('selectedTemplate', template);
            
            // Highlight the selected card
            templateCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // Check for shared data in URL or load from localStorage
    function checkForSharedData() {
        const urlParams = new URLSearchParams(window.location.search);
        const sharedData = urlParams.get('data');
        
        if (sharedData) {
            try {
                // Using LZString to decompress the shared data
                const decompressed = LZString.decompressFromEncodedURIComponent(sharedData);
                const resumeData = JSON.parse(decompressed);
                generateResumeHTML(resumeData, 'modern');
            } catch (e) {
                console.error('Error parsing shared data:', e);
                alert('Invalid resume data');
                finalResume.innerHTML = '<p class="error">Invalid resume data. Please check the share link.</p>';
                document.querySelector('.preview-actions').style.display = 'none';
            }
        } else if (localStorage.getItem('resumeData')) {
            // Load from localStorage
            const resumeData = JSON.parse(localStorage.getItem('resumeData'));
            const selectedTemplate = localStorage.getItem('selectedTemplate') || 'modern';
            generateResumeHTML(resumeData, selectedTemplate);
            
            // Highlight the selected template card
            const selectedCard = document.querySelector(`.template-card[data-template="${selectedTemplate}"]`);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
        } else {
            // No data found
            finalResume.innerHTML = '<p class="empty">No resume data found. Please create a resume first.</p>';
            document.querySelector('.preview-actions').style.display = 'none';
        }
    }

    // Generate resume HTML function
    function generateResumeHTML(data, template) {
        let resumeHTML = `
            <div class="resume-header">
                <h2>${data.personalInfo?.fullName || 'Your Name'}</h2>
                <p>${data.personalInfo?.profession || 'Your Profession'}</p>
                <div class="contact-info">
                    ${data.personalInfo?.email ? `<div><i class="fas fa-envelope"></i> ${data.personalInfo.email}</div>` : ''}
                    ${data.personalInfo?.phone ? `<div><i class="fas fa-phone"></i> ${data.personalInfo.phone}</div>` : ''}
                    ${data.personalInfo?.address ? `<div><i class="fas fa-map-marker-alt"></i> ${data.personalInfo.address}</div>` : ''}
                    ${data.personalInfo?.linkedin ? `<div><i class="fab fa-linkedin"></i> ${data.personalInfo.linkedin}</div>` : ''}
                    ${data.personalInfo?.github ? `<div><i class="fab fa-github"></i> ${data.personalInfo.github}</div>` : ''}
                    ${data.personalInfo?.portfolio ? `<div><i class="fas fa-globe"></i> ${data.personalInfo.portfolio}</div>` : ''}
                </div>
            </div>
        `;

        // Education section
        if (data.education?.length > 0) {
            resumeHTML += `<div class="resume-section">
                <h3>Education</h3>`;
            
            data.education.forEach(edu => {
                resumeHTML += `
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
            
            resumeHTML += `</div>`;
        }

        // Experience section
        if (data.experience?.length > 0) {
            resumeHTML += `<div class="resume-section">
                <h3>Work Experience</h3>`;
            
            data.experience.forEach(exp => {
                resumeHTML += `
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
            
            resumeHTML += `</div>`;
        }

        // Skills section
        if (data.skills?.length > 0) {
            resumeHTML += `<div class="resume-section">
                <h3>Skills</h3>
                <div class="skills-list">`;
            
            data.skills.forEach(skill => {
                resumeHTML += `<div class="skill-item">${skill.name || 'Skill'}</div>`;
            });
            
            resumeHTML += `</div></div>`;
        }

        // Projects section
        if (data.projects?.length > 0) {
            resumeHTML += `<div class="resume-section">
                <h3>Projects</h3>`;
            
            data.projects.forEach(project => {
                resumeHTML += `
                    <div class="project-item">
                        <div class="section-title">${project.name || 'Project Name'}</div>
                        ${project.technologies ? `<div class="section-subtitle">Technologies: ${project.technologies}</div>` : ''}
                        ${project.description ? `<div class="section-description">${project.description.replace(/\n/g, '<br>')}</div>` : ''}
                    </div>
                `;
            });
            
            resumeHTML += `</div>`;
        }

        // Certifications section
        if (data.certifications?.length > 0) {
            resumeHTML += `<div class="resume-section">
                <h3>Certifications</h3>`;
            
            data.certifications.forEach(cert => {
                resumeHTML += `
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
            
            resumeHTML += `</div>`;
        }

        finalResume.innerHTML = resumeHTML;
        
        // Show actions if they were hidden
        document.querySelector('.preview-actions').style.display = 'flex';
    }

    // Generate PDF function
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Get the resume element
        const element = document.getElementById('finalResume');
        
        // Use html2canvas to capture the element
        html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true,
            backgroundColor: null
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = doc.internal.pageSize.getWidth() - 20;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            
            // Generate a filename with the person's name if available
            const resumeData = JSON.parse(localStorage.getItem('resumeData')) || {};
            const fileName = resumeData.personalInfo?.fullName 
                ? `resume_${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`
                : 'resume.pdf';
            
            doc.save(fileName);
        });
    }
});