import React, { useState } from 'react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { Header, Footer, Banner } from "../components/index";

const Suggestions = () => {
    const [formData, setFormData] = useState({ name: '', email: '', category: 'feature', suggestion: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.suggestion) {
            return toast.error("Please fill in all fields");
        }

        setSubmitting(true);
        const loadingToast = toast.loading("Submitting your suggestion...");

        try {
            const response = await fetch("/api/suggestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    category: formData.category,
                    suggestion: formData.suggestion,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.dismiss(loadingToast);
                toast.success("Thank you! Your suggestion has been received.");
                setFormData({ name: '', email: '', category: 'feature', suggestion: '' });
            } else {
                toast.dismiss(loadingToast);
                toast.error(result.error || "Failed to submit suggestion");
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const categories = [
        { value: 'feature', label: '💡 Feature Request', description: 'Suggest new features, protocol improvements, or tools you would like to see added to the AMERO X ecosystem.' },
        { value: 'ui', label: '🎨 UI/UX Improvement', description: 'Help us improve the user interface, navigation, responsiveness, or visual design of the platform.' },
        { value: 'security', label: '🔒 Security Concern', description: 'Report potential security vulnerabilities, suspicious activity, or suggest security enhancements.' },
        { value: 'partnership', label: '🤝 Partnership Idea', description: 'Propose strategic partnerships, integrations with other protocols, or collaboration opportunities.' },
        { value: 'tokenomics', label: '📊 Tokenomics Feedback', description: 'Share ideas about staking rewards, fee structures, token distribution, or governance mechanisms.' },
        { value: 'other', label: '📝 General Feedback', description: 'Any other feedback, ideas, bug reports, or suggestions you would like to share with the team.' },
    ];

    const recentUpdates = [
        { title: "Mobile responsive design improvements deployed", date: "Feb 2026", status: "Completed" },
        { title: "Social media verification system enhanced", date: "Feb 2026", status: "Completed" },
        { title: "Instagram verification via oEmbed API", date: "Feb 2026", status: "Completed" },
        { title: "Multi-language support", date: "Q2 2026", status: "Planned" },
        { title: "Advanced staking dashboard", date: "Q2 2026", status: "Planned" },
        { title: "Mobile application (iOS & Android)", date: "Q3 2026", status: "Planned" },
    ];

    return (
        <div>
            <Head>
                <title>AMERO X - Suggestions</title>
                <meta name="description" content="Share your ideas and suggestions to help improve the AMERO X ecosystem. Your feedback directly shapes the future of our protocol." />
            </Head>
            <Header />
            <Banner title="Suggestions" type="Home" action="Suggestions" path="/" />

            <section className="suggestion-section">
                <div className="hero-glow-layer"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                                <h2 style={{ color: '#d4af37', marginBottom: '15px' }}>We Value Your Feedback</h2>
                                <p style={{ color: '#aaa', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
                                    AMERO X is built by the community, for the community. Your suggestions directly shape the future of our protocol. Every submission is reviewed by our core team.
                                </p>
                            </div>

                            <div className="row suggestion-mobile-reverse" style={{ rowGap: '30px' }}>
                                {/* Left Column - Categories + Roadmap */}
                                <div className="col-lg-5">
                                    <h3 style={{ color: '#d4af37', fontSize: '20px', marginBottom: '20px' }}>Choose a Category</h3>
                                    {categories.map((cat, idx) => (
                                        <div key={idx}
                                            onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                                            style={{
                                                background: formData.category === cat.value ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.08)',
                                                border: `1px solid ${formData.category === cat.value ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.08)'}`,
                                                borderRadius: '12px',
                                                padding: '16px 18px',
                                                marginBottom: '10px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                            }}
                                            onMouseEnter={(e) => { if (formData.category !== cat.value) e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; }}
                                            onMouseLeave={(e) => { if (formData.category !== cat.value) e.currentTarget.style.borderColor = 'rgba(212,175,55,0.08)'; }}
                                        >
                                            <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '4px', fontWeight: '600' }}>{cat.label}</h4>
                                            <p style={{ color: '#888', fontSize: '12px', margin: 0, lineHeight: '1.5' }}>{cat.description}</p>
                                        </div>
                                    ))}

                                    {/* Recent Updates */}
                                    <div style={{ marginTop: '30px' }}>
                                        <h3 style={{ color: '#d4af37', fontSize: '18px', marginBottom: '18px' }}>Recent Updates & Roadmap</h3>
                                        {recentUpdates.map((update, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '10px 0',
                                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                            }}>
                                                <div>
                                                    <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>{update.title}</p>
                                                    <span style={{ color: '#666', fontSize: '11px' }}>{update.date}</span>
                                                </div>
                                                <span style={{
                                                    background: update.status === 'Completed' ? 'rgba(0,200,83,0.15)' : 'rgba(212,175,55,0.15)',
                                                    color: update.status === 'Completed' ? '#00c853' : '#d4af37',
                                                    padding: '3px 10px',
                                                    borderRadius: '12px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    whiteSpace: 'nowrap',
                                                }}>{update.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column - Form */}
                                <div className="col-lg-7">
                                    <div className="suggestion-form-box">
                                        <h3 style={{ color: '#d4af37', fontSize: '20px', marginBottom: '8px' }}>Submit Your Suggestion</h3>
                                        <p style={{ color: '#888', fontSize: '13px', marginBottom: '25px' }}>
                                            All submissions are sent to our team and stored securely. We review every suggestion and prioritize based on community demand and technical feasibility.
                                        </p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row" style={{ marginBottom: '15px' }}>
                                                <div className="col-md-6" style={{ marginBottom: '15px' }}>
                                                    <label style={{ color: '#aaa', fontSize: '13px', marginBottom: '6px', display: 'block', fontWeight: '600' }}>Your Name *</label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                        placeholder="Enter your name"
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '12px 16px',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            border: '1px solid rgba(212,175,55,0.15)',
                                                            borderRadius: '8px',
                                                            color: '#fff',
                                                            fontSize: '14px',
                                                            outline: 'none',
                                                            transition: 'border-color 0.3s',
                                                        }}
                                                        onFocus={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.4)'}
                                                        onBlur={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.15)'}
                                                    />
                                                </div>
                                                <div className="col-md-6" style={{ marginBottom: '15px' }}>
                                                    <label style={{ color: '#aaa', fontSize: '13px', marginBottom: '6px', display: 'block', fontWeight: '600' }}>Your Email *</label>
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                        placeholder="Enter your email"
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '12px 16px',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            border: '1px solid rgba(212,175,55,0.15)',
                                                            borderRadius: '8px',
                                                            color: '#fff',
                                                            fontSize: '14px',
                                                            outline: 'none',
                                                            transition: 'border-color 0.3s',
                                                        }}
                                                        onFocus={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.4)'}
                                                        onBlur={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.15)'}
                                                    />
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '15px' }}>
                                                <label style={{ color: '#aaa', fontSize: '13px', marginBottom: '6px', display: 'block', fontWeight: '600' }}>
                                                    Selected Category: <span style={{ color: '#d4af37' }}>{categories.find(c => c.value === formData.category)?.label}</span>
                                                </label>
                                            </div>

                                            <div style={{ marginBottom: '20px' }}>
                                                <label style={{ color: '#aaa', fontSize: '13px', marginBottom: '6px', display: 'block', fontWeight: '600' }}>Your Suggestion *</label>
                                                <textarea
                                                    value={formData.suggestion}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, suggestion: e.target.value }))}
                                                    placeholder="Describe your suggestion in detail. What problem does it solve? How would it benefit the AMERO X community?"
                                                    required
                                                    rows={6}
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(212,175,55,0.15)',
                                                        borderRadius: '8px',
                                                        color: '#fff',
                                                        fontSize: '14px',
                                                        outline: 'none',
                                                        resize: 'vertical',
                                                        lineHeight: '1.6',
                                                        transition: 'border-color 0.3s',
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.4)'}
                                                    onBlur={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.15)'}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="btn"
                                                style={{
                                                    width: '100%',
                                                    fontSize: '15px',
                                                    padding: '14px',
                                                    opacity: submitting ? 0.7 : 1,
                                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                                }}
                                            >
                                                {submitting ? 'Submitting...' : 'Submit Suggestion'}
                                            </button>
                                        </form>

                                        <p style={{ color: '#666', fontSize: '12px', marginTop: '15px', textAlign: 'center' }}>
                                            Your suggestion will be securely stored and emailed to our team. We respond to actionable feedback within 48 hours.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Suggestions;
