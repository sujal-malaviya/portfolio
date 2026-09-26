/**
 * script.js
 * Core functionality for Malaviya Sujal's 3D Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // 1. Current Year in Footer
    // --------------------------------------------------------
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --------------------------------------------------------
    // 2. Navbar & Mobile Menu Logic
    // --------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const scrollTopBtn = document.getElementById('scroll-top');

    // Sticky Navbar & Scroll to Top button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            scrollTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('show');
        }
        
        // Active link highlighting
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const icon = hamburgerBtn.querySelector('i');
        if (mobileMenu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close Mobile Menu on Link Click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Scroll to Top Button Action
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --------------------------------------------------------
    // 3. Scroll Reveal Animations (Intersection Observer)
    // --------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                
                // Trigger counter animation if element contains counters
                const counters = entry.target.querySelectorAll('.counter');
                if(counters.length > 0) {
                    counters.forEach(counter => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        const duration = 2000; // ms
                        const step = target / (duration / 16); // 60fps
                        
                        let current = 0;
                        const updateCounter = () => {
                            current += step;
                            if(current < target) {
                                counter.innerText = Number.isInteger(target) ? Math.ceil(current) : current.toFixed(2);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                    // Prevent running counter animation again
                    observer.unobserve(entry.target);
                }
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // On Load animations
    setTimeout(() => {
        document.querySelectorAll('.animate-on-load').forEach(el => {
            el.classList.add('active');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);

    // --------------------------------------------------------
    // 4. Project Filtering
    // --------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if(filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale3d(1,1,1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale3d(0.9,0.9,0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --------------------------------------------------------
    // 5. Project Modal Logic
    // --------------------------------------------------------
    const projectData = {
        1: {
            title: "Shree Gayatri Handicraft",
            desc: "A dynamic e-commerce platform for traditional handmade handicraft products with product browsing, categories, cart, inquiry, custom orders and business-focused customer interaction.",
            tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
            features: [
                "Dynamic product catalog and categorization",
                "Shopping cart and custom order inquiries",
                "Admin dashboard for product management",
                "Responsive design for mobile shoppers"
            ],
            github: "#",
            demo: "#"
        },
        2: {
            title: "AI-Based Resume Screening System",
            desc: "An AI-powered system designed to analyze resumes and compare candidate profiles with job requirements using intelligent matching techniques.",
            tech: ["Python", "AI/ML", "NLP", "JavaScript"],
            features: [
                "Automated resume parsing and text extraction",
                "NLP-based keyword matching and scoring",
                "Candidate ranking against job descriptions",
                "Clean dashboard for recruiters"
            ],
            github: "#",
            demo: "#"
        },
        3: {
            title: "AI Product Recommendation System",
            desc: "An intelligent recommendation system that analyzes product information and user preferences to suggest relevant products.",
            tech: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
            features: [
                "Collaborative and content-based filtering",
                "Data preprocessing using Pandas",
                "Machine learning model implementation with Scikit-learn",
                "Scalable recommendation pipeline"
            ],
            github: "#",
            demo: "#"
        },
        4: {
            title: "Explore My City",
            desc: "A city discovery platform where users can search and explore places such as hospitals, restaurants, schools and gardens with filtering and location-based information.",
            tech: ["HTML", "CSS", "JavaScript"],
            features: [
                "Interactive place discovery and search",
                "Category filtering (Hospitals, Restaurants, etc.)",
                "Responsive grid layout",
                "Location and contact information rendering"
            ],
            github: "#",
            demo: "#"
        }
    };

    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const viewBtns = document.querySelectorAll('.view-project-btn');

    const openModal = (id) => {
        const data = projectData[id];
        if(!data) return;

        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-desc').innerText = data.desc;
        
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = '';
        data.tech.forEach(t => {
            const span = document.createElement('span');
            span.innerText = t;
            techContainer.appendChild(span);
        });

        const featuresList = document.getElementById('modal-features-list');
        featuresList.innerHTML = '';
        data.features.forEach(f => {
            const li = document.createElement('li');
            li.innerText = f;
            featuresList.appendChild(li);
        });

        document.getElementById('modal-github').href = data.github;
        document.getElementById('modal-demo').href = data.demo;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            openModal(id);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --------------------------------------------------------
    // 6. Generate GitHub Contribution Graph Placeholder
    // --------------------------------------------------------
    const ghGraph = document.getElementById('gh-graph-placeholder');
    if (ghGraph) {
        for(let i = 0; i < 140; i++) {
            const box = document.createElement('div');
            const rand = Math.random();
            let level = 'lvl-0';
            if (rand > 0.9) level = 'lvl-4';
            else if (rand > 0.75) level = 'lvl-3';
            else if (rand > 0.6) level = 'lvl-2';
            else if (rand > 0.4) level = 'lvl-1';
            
            box.className = `gh-box ${level}`;
            ghGraph.appendChild(box);
        }
    }

    // --------------------------------------------------------
    // 7. Contact Form Validation
    // --------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');

            if(name.value.trim().length < 2) {
                document.getElementById('name-error').innerText = 'Name must be at least 2 characters';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email.value)) {
                document.getElementById('email-error').innerText = 'Please enter a valid email address';
                isValid = false;
            }

            if(subject.value.trim().length < 3) {
                document.getElementById('subject-error').innerText = 'Subject must be at least 3 characters';
                isValid = false;
            }

            if(message.value.trim().length < 10) {
                document.getElementById('message-error').innerText = 'Message must be at least 10 characters';
                isValid = false;
            }

            if(!isValid) {
                e.preventDefault(); 
            } else {
                const btnText = document.querySelector('#submit-btn .btn-text');
                btnText.innerText = 'Sending...';
            }
        });
    }

    // --------------------------------------------------------
    // 8. AI Chatbot Logic
    // --------------------------------------------------------
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatPanel = document.getElementById('chatbot-panel');
    const chatClose = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    const chatChips = document.querySelectorAll('.chat-chip');

    const botResponses = {
        "about": "Sujal is a B.Sc. Information Technology student at Atmiya University with a strong interest in Data Science, Artificial Intelligence, and Machine Learning.",
        "skill": "Sujal is proficient in Python, C++, Data Science libraries (Pandas, Scikit-learn), and Web Development (HTML, CSS, JS, PHP).",
        "project": "Sujal has built several projects including an AI Resume Screening System, a Product Recommendation engine, and dynamic e-commerce sites.",
        "education": "Sujal is currently in his 5th Semester of B.Sc. IT at Atmiya University, maintaining an excellent 8.42 CGPA.",
        "contact": "You can reach Sujal at sujalmalaviya720@gmail.com, or via the Contact section on this page.",
        "resume": "You can download Sujal's resume from the 'Resume' section or by clicking the download button in the hero area.",
        "hi": "Hello there! How can I help you explore Sujal's portfolio?",
        "hello": "Hi! I am Sujal AI. Feel free to ask about his skills, projects, or background.",
        "default": "I'm not exactly sure about that. Try asking about Sujal's 'skills', 'projects', 'education', or 'contact' info!"
    };

    chatToggle.addEventListener('click', () => chatPanel.classList.toggle('open'));
    chatClose.addEventListener('click', () => chatPanel.classList.remove('open'));

    const addMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const showTyping = () => {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const removeTyping = () => {
        const el = document.getElementById('typing-indicator');
        if(el) el.remove();
    };

    const handleUserQuery = (query) => {
        if(!query.trim()) return;
        
        addMessage(query, true);
        chatInput.value = '';
        showTyping();

        setTimeout(() => {
            removeTyping();
            let response = botResponses["default"];
            const lowerQuery = query.toLowerCase();
            
            for(const [key, val] of Object.entries(botResponses)) {
                if(key !== 'default' && lowerQuery.includes(key)) {
                    response = val;
                    break;
                }
            }
            addMessage(response);
        }, 800);
    };

    chatSend.addEventListener('click', () => handleUserQuery(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleUserQuery(chatInput.value);
    });
    chatChips.forEach(chip => {
        chip.addEventListener('click', () => handleUserQuery(chip.innerText));
    });

    // --------------------------------------------------------
    // 9. Resume Download Graceful Handling
    // --------------------------------------------------------
    const downloadBtn = document.getElementById('download-resume-btn');
    if(downloadBtn) {
        downloadBtn.addEventListener('click', async (e) => {
            try {
                const response = await fetch('./assets/resume.pdf', { method: 'HEAD' });
                if(!response.ok) {
                    e.preventDefault();
                    alert("Resume file not found on server. Please ensure 'resume.pdf' is placed in the 'assets' folder.");
                }
            } catch (err) {
                console.log("Local fetch check skipped for resume.");
            }
        });
    }

    // --------------------------------------------------------
    // 10. Three.js 3D Background (Neural/Data Particles)
    // --------------------------------------------------------
    const init3DBackground = () => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 60;

        // Create Particles forming a globe
        const geometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);
        const colorsArray = new Float32Array(particlesCount * 3);

        const colorGold = new THREE.Color('#D4AF37');
        const colorWhite = new THREE.Color('#ffffff');

        for(let i = 0; i < particlesCount * 3; i+=3) {
            // Sphere math
            const r = 40 + Math.random() * 15;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            
            posArray[i] = r * Math.sin(phi) * Math.cos(theta);
            posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);
            posArray[i+2] = r * Math.cos(phi);

            // Mix gold and white
            const mixedColor = colorGold.clone().lerp(colorWhite, Math.random());
            colorsArray[i] = mixedColor.r;
            colorsArray[i+1] = mixedColor.g;
            colorsArray[i+2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        // Mouse Parallax Interaction
        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Rotate the data sphere
            particlesMesh.rotation.y = elapsedTime * 0.05;
            particlesMesh.rotation.x = elapsedTime * 0.02;

            // Subtle camera parallax
            camera.position.x += (mouseX * 0.02 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.02 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    // --------------------------------------------------------
    // 11. 3D Card Hover Tilt Effect (Vanilla JS)
    // --------------------------------------------------------
    const init3DTilt = () => {
        // Only run on non-touch devices for better performance
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const tiltElements = document.querySelectorAll('.project-card, .skill-category, .stat-card, .edu-card, .achievement-card, .contact-method, .floating-card');
        
        tiltElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Remove transition so tracking mouse is smooth without delay
                el.style.transition = 'none';
                
                // Animate inner children pop out
                const children = el.children;
                for(let i=0; i<children.length; i++) {
                    children[i].style.transform = 'translateZ(40px)';
                }
            });

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Adjust divisor (e.g. 15) to change tilt intensity. Smaller = More intense.
                const rotateX = ((y - centerY) / centerY) * -12; 
                const rotateY = ((x - centerX) / centerX) * 12;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            el.addEventListener('mouseleave', () => {
                // Restore transition to smoothly return to default position
                el.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s, border-color 0.4s';
                el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                
                // Reset children
                const children = el.children;
                for(let i=0; i<children.length; i++) {
                    children[i].style.transform = 'translateZ(30px)';
                }
            });
        });
    };

    // Initialize 3D Features
    init3DBackground();
    init3DTilt();

});
