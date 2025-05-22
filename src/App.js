import React, { useState, useEffect, useRef } from 'react';

const promptCategories = {
  emotional: [
    { text: "What emotion are you avoiding right now, and why?", credit: "Emotional Awareness", mood: "contemplative" },
    { text: "Describe a feeling you're having without judging it as good or bad.", credit: "Mindful Acceptance", mood: "calm" },
    { text: "What would you say to comfort a friend feeling exactly what you're feeling right now?", credit: "Self-Compassion", mood: "nurturing" },
    { text: "Write about a time when you felt completely safe and at peace.", credit: "Emotional Memory", mood: "peaceful" },
    { text: "What does your inner critic sound like? Now, what would your inner friend say instead?", credit: "Inner Voice Work", mood: "reflective" },
    { text: "If your current emotion had a color, shape, and texture, what would it be?", credit: "Emotion Visualization", mood: "creative" },
    { text: "What boundaries do you need to set to protect your emotional well-being?", credit: "Emotional Boundaries", mood: "empowering" },
    { text: "Describe a moment when you felt truly understood by someone.", credit: "Connection Memory", mood: "warm" }
  ],
  healing: [
    { text: "What part of this still needs more kindness?", credit: "Healing Focus", mood: "gentle" },
    { text: "Write a letter of forgiveness to yourself for something you've been carrying.", credit: "Self-Forgiveness", mood: "releasing" },
    { text: "What would healing look like for you today? Not tomorrow, not next year, but today.", credit: "Present Healing", mood: "hopeful" },
    { text: "Describe a wound that has become a source of wisdom or strength.", credit: "Post-Traumatic Growth", mood: "triumphant" },
    { text: "What permission do you need to give yourself to heal?", credit: "Healing Permission", mood: "liberating" },
    { text: "If your pain could speak, what would it want you to know?", credit: "Pain Dialogue", mood: "deep" },
    { text: "Write about someone who made you feel worthy of love exactly as you are.", credit: "Unconditional Love", mood: "loved" },
    { text: "What small act of healing can you offer yourself right now?", credit: "Micro-Healing", mood: "nurturing" }
  ],
  mindfulness: [
    { text: "Describe what you notice in your body right now, without changing anything.", credit: "Body Awareness", mood: "present" },
    { text: "What are five things you can see, four you can hear, three you can touch, two you can smell, and one you can taste?", credit: "5-4-3-2-1 Grounding", mood: "grounded" },
    { text: "Write about this moment as if you're experiencing it for the very first time.", credit: "Beginner's Mind", mood: "wonder" },
    { text: "What thoughts keep visiting your mind today? Welcome them like guests, then let them go.", credit: "Thought Observer", mood: "flowing" },
    { text: "Describe your breathing right now. Is it shallow or deep? Fast or slow? No judgment, just awareness.", credit: "Breath Awareness", mood: "centered" },
    { text: "What would you notice if you approached this day with gentle curiosity instead of judgment?", credit: "Curious Awareness", mood: "open" },
    { text: "Write about a simple pleasure you experienced today that you almost missed.", credit: "Present Moment Joy", mood: "grateful" },
    { text: "If you could send love to every part of yourself right now, where would you start?", credit: "Loving-Kindness", mood: "compassionate" }
  ],
  gratitude: [
    { text: "What are three things you're grateful for right now?", credit: "Daily Gratitude", mood: "thankful" },
    { text: "Write about someone who showed you unexpected kindness recently.", credit: "Kindness Recognition", mood: "warm" },
    { text: "What challenge are you grateful for because of how it helped you grow?", credit: "Growth Gratitude", mood: "appreciative" },
    { text: "Describe a part of your body you're grateful for and why.", credit: "Body Appreciation", mood: "accepting" },
    { text: "What small comfort brought you peace today?", credit: "Simple Comforts", mood: "content" },
    { text: "Write a thank you note to a part of yourself that's been working hard lately.", credit: "Self-Appreciation", mood: "loving" },
    { text: "What skill or ability do you have that you sometimes take for granted?", credit: "Ability Gratitude", mood: "proud" },
    { text: "Describe a moment today when you felt connected to something larger than yourself.", credit: "Connection Gratitude", mood: "connected" }
  ],
  selfCare: [
    { text: "How did you show kindness to yourself today?", credit: "Self-Kindness", mood: "gentle" },
    { text: "What does your soul need right now that you haven't been giving it?", credit: "Soul Needs", mood: "introspective" },
    { text: "If you treated yourself the way you treat your best friend, what would change?", credit: "Friend Treatment", mood: "compassionate" },
    { text: "What activity makes you lose track of time in the best way?", credit: "Flow State", mood: "joyful" },
    { text: "Write about a way you can nurture yourself that doesn't cost money.", credit: "Free Self-Care", mood: "resourceful" },
    { text: "What would 'good enough' look like today instead of perfect?", credit: "Perfectionism Release", mood: "accepting" },
    { text: "How can you make your environment more supportive of your well-being?", credit: "Environment Care", mood: "nurturing" },
    { text: "What's one habit you'd like to release and one you'd like to embrace?", credit: "Habit Reflection", mood: "intentional" }
  ],
  inspiration: [
    { text: "Hope is a good thing, maybe the best of things. – The Shawshank Redemption", credit: "The Shawshank Redemption", mood: "hopeful" },
    { text: "You are not the darkness you endured. You are the light that refused to surrender.", credit: "Unknown", mood: "triumphant" },
    { text: "There is no secret ingredient. It's just you. – Kung Fu Panda", credit: "Kung Fu Panda", mood: "empowering" },
    { text: "What would you tell your younger self today?", credit: "Wisdom Sharing", mood: "wise" },
    { text: "You have been assigned this mountain to show others it can be moved.", credit: "Purpose", mood: "determined" },
    { text: "What strength have you discovered within yourself that surprised you?", credit: "Hidden Strength", mood: "proud" },
    { text: "If you knew you couldn't fail, what would you try?", credit: "Fearless Exploration", mood: "bold" },
    { text: "How has your story given you wisdom that only you can share?", credit: "Unique Wisdom", mood: "meaningful" }
  ],
  whisper: [
    { text: "What secret does your heart whisper to you in the quiet moments?", credit: "Heart Whispers", mood: "intimate" },
    { text: "If silence could speak, what would it tell you about yourself?", credit: "Silent Wisdom", mood: "profound" },
    { text: "What truth are you afraid to acknowledge?", credit: "Hidden Truth", mood: "vulnerable" },
    { text: "Describe the voice inside you that knows exactly what you need.", credit: "Inner Knowing", mood: "intuitive" },
    { text: "What would you do if no one was watching or judging?", credit: "Authentic Self", mood: "free" },
    { text: "Write about a dream that keeps calling to you.", credit: "Dream Calling", mood: "aspirational" },
    { text: "What does your intuition keep trying to tell you?", credit: "Intuitive Voice", mood: "listening" },
    { text: "If your future self could whisper one thing to you right now, what would it be?", credit: "Future Wisdom", mood: "visionary" }
  ]
};

// Dynamic background system based on mood/tone (using Unsplash for reliability)
const backgroundScenes = {
  // Nordic/Scandinavia scenes
  peaceful: [
    "https://source.unsplash.com/1920x1080/?norwegian,fjord,calm",
    "https://source.unsplash.com/1920x1080/?scandinavian,lake,mirror",
    "https://source.unsplash.com/1920x1080/?finland,forest,misty"
  ],
  contemplative: [
    "https://source.unsplash.com/1920x1080/?nordic,mountains,fog",
    "https://source.unsplash.com/1920x1080/?iceland,landscape,moody",
    "https://source.unsplash.com/1920x1080/?norway,clouds,dramatic"
  ],
  hopeful: [
    "https://source.unsplash.com/1920x1080/?aurora,northern,lights",
    "https://source.unsplash.com/1920x1080/?nordic,sunrise,golden",
    "https://source.unsplash.com/1920x1080/?scandinavia,spring,bright"
  ],
  calm: [
    "https://source.unsplash.com/1920x1080/?scandinavian,beach,serene",
    "https://source.unsplash.com/1920x1080/?nordic,water,still",
    "https://source.unsplash.com/1920x1080/?finland,winter,quiet"
  ],
  empowering: [
    "https://source.unsplash.com/1920x1080/?mountain,peak,triumph",
    "https://source.unsplash.com/1920x1080/?nordic,cliff,strong",
    "https://source.unsplash.com/1920x1080/?scandinavian,glacier,powerful"
  ],
  // Ocean scenes
  flowing: [
    "https://source.unsplash.com/1920x1080/?ocean,waves,gentle",
    "https://source.unsplash.com/1920x1080/?sea,rhythm,peaceful",
    "https://source.unsplash.com/1920x1080/?water,movement,calm"
  ],
  deep: [
    "https://source.unsplash.com/1920x1080/?ocean,deep,blue",
    "https://source.unsplash.com/1920x1080/?sea,mysterious,vast",
    "https://source.unsplash.com/1920x1080/?underwater,serene,blue"
  ],
  // Forest scenes
  nurturing: [
    "https://source.unsplash.com/1920x1080/?forest,green,nurturing",
    "https://source.unsplash.com/1920x1080/?woodland,gentle,light",
    "https://source.unsplash.com/1920x1080/?trees,protective,warm"
  ],
  grounded: [
    "https://source.unsplash.com/1920x1080/?forest,earth,roots",
    "https://source.unsplash.com/1920x1080/?woodland,stable,strong",
    "https://source.unsplash.com/1920x1080/?nature,foundation,solid"
  ],
  // Default and special moods
  default: [
    "https://source.unsplash.com/1920x1080/?nordic,nature,beautiful",
    "https://source.unsplash.com/1920x1080/?scandinavian,landscape,serene",
    "https://source.unsplash.com/1920x1080/?nature,peaceful,healing"
  ],
  triumphant: [
    "https://source.unsplash.com/1920x1080/?summit,victory,achievement",
    "https://source.unsplash.com/1920x1080/?mountain,top,success",
    "https://source.unsplash.com/1920x1080/?peak,triumph,golden"
  ],
  grateful: [
    "https://source.unsplash.com/1920x1080/?sunset,golden,light,warm",
    "https://source.unsplash.com/1920x1080/?harvest,abundance,nature",
    "https://source.unsplash.com/1920x1080/?cozy,home,comfort"
  ],
  reflective: [
    "https://source.unsplash.com/1920x1080/?library,books,study,quiet",
    "https://source.unsplash.com/1920x1080/?rain,window,contemplation",
    "https://source.unsplash.com/1920x1080/?foggy,morning,solitude"
  ],
  creative: [
    "https://source.unsplash.com/1920x1080/?art,studio,inspiration",
    "https://source.unsplash.com/1920x1080/?colorful,abstract,paint",
    "https://source.unsplash.com/1920x1080/?dreamy,surreal,imagination"
  ]
};

// Flatten all prompts into a single array for random selection
const allPrompts = Object.values(promptCategories).flat();

function App() {
  const [promptIndex, setPromptIndex] = useState(-1);
  const [currentEntry, setCurrentEntry] = useState('');
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journal_entries');
    return saved ? JSON.parse(saved) : [];
  });
  const [clock, setClock] = useState(new Date());
  const [lanternMode, setLanternMode] = useState(false); // Controls if video is active
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategories, setShowCategories] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [currentMood, setCurrentMood] = useState('default'); // Default mood for dynamic backgrounds
  const [backgroundImage, setBackgroundImage] = useState(''); // Stores the URL for image backgrounds
  const [showPorsche, setShowPorsche] = useState(false);
  
  const videoRef = useRef(null);
  const textareaRef = useRef(null);
  const notificationTimeoutRef = useRef(null); // Ref to store notification timeout ID

  // Cloudinary URLs (publicly accessible)
  const lanternVideoUrl = "https://res.cloudinary.com/dausootjh/video/upload/v1747906119/vhfgxrpxygwaqnpsmca4.mp4";
  const pineIconUrl = "https://res.cloudinary.com/dausootjh/image/upload/v1747906043/Northern_Journal_Icon_Design_g9vm1l.png";
  const porscheImageUrl = "https://res.cloudinary.com/dausootjh/image/upload/v1747906043/Twilight_Porsche_in_Snowy_Landscape_xwlrkj.png";

  const getFormattedDate = () =>
    clock.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    });

  const getFormattedTime = () =>
    clock.toLocaleTimeString('en-US', {
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true
    });

  // Real-time clock
  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize background on mount (dynamic images by default)
  useEffect(() => {
    updateBackgroundForMood('default');
  }, []);

  // Activity tracking for auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      // Auto-save only if currentEntry has content and user is inactive for 30 seconds
      if (currentEntry.trim() && Date.now() - lastActivity > 30000) {
        autoSave();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [currentEntry, lastActivity]);

  // Video playback control for lantern mode
  useEffect(() => {
    if (videoRef.current) {
      if (lanternMode) {
        videoRef.current.play().catch(error => console.warn("Video autoplay failed:", error));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset video to start
      }
    }
  }, [lanternMode]);

  // Local storage for entries
  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(entries));
  }, [entries]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('journal_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setCurrentEntry(draft.content || '');
        if (draft.prompt) {
          const promptIdx = allPrompts.findIndex(p => p.text === draft.prompt.text);
          if (promptIdx !== -1) {
            setPromptIndex(promptIdx);
          }
        }
        if (draft.mood) {
          setCurrentMood(draft.mood); // Will trigger background update if dynamic mode is active
        }
        showNotification('📝 Draft loaded from last session!');
      } catch (e) {
        console.error("Failed to parse journal draft from localStorage:", e);
        localStorage.removeItem('journal_draft'); // Clear corrupted draft
      }
    }
  }, []);

  // Update background based on mood (only applies if not in lantern mode)
  const updateBackgroundForMood = (mood) => {
    if (!lanternMode) { // Only update image background if lantern mode is off
      const scenes = backgroundScenes[mood] || backgroundScenes.default;
      const randomScene = scenes[Math.floor(Math.random() * scenes.length)];
      setBackgroundImage(randomScene);
    }
    setCurrentMood(mood);
  };

  // Notification handler
  const showNotification = (message, duration = 3000) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification(message);
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification('');
      notificationTimeoutRef.current = null;
    }, duration);
  };

  // Typing indicator and basic mood analysis
  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrentEntry(text);
    setIsTyping(true);
    setLastActivity(Date.now());
    
    // Debounce the typing indicator reset
    if (notificationTimeoutRef.current) { // Reusing notificationTimeoutRef, could use a separate one
        clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = setTimeout(() => setIsTyping(false), 1000);

    // Basic sentiment analysis for background change
    let detectedMood = 'default';
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('grateful') || lowerText.includes('thankful') || lowerText.includes('blessed')) {
      detectedMood = 'grateful';
    } else if (lowerText.includes('calm') || lowerText.includes('peace') || lowerText.includes('serene') || lowerText.includes('relaxed')) {
      detectedMood = 'calm';
    } else if (lowerText.includes('hope') || lowerText.includes('better') || lowerText.includes('improve') || lowerText.includes('future')) {
      detectedMood = 'hopeful';
    } else if (lowerText.includes('deep') || lowerText.includes('profound') || lowerText.includes('soul') || lowerText.includes('meaning')) {
      detectedMood = 'deep';
    } else if (lowerText.includes('flow') || lowerText.includes('rhythm') || lowerText.includes('movement') || lowerText.includes('effortless')) {
      detectedMood = 'flowing';
    } else if (lowerText.includes('strong') || lowerText.includes('power') || lowerText.includes('triumph') || lowerText.includes('overcome') || lowerText.includes('achieve')) {
      detectedMood = 'empowering';
    } else if (lowerText.includes('contemplate') || lowerText.includes('reflect') || lowerText.includes('ponder') || lowerText.includes('think')) {
        detectedMood = 'contemplative';
    } else if (lowerText.includes('nurture') || lowerText.includes('care') || lowerText.includes('gentle') || lowerText.includes('comfort')) {
        detectedMood = 'nurturing';
    } else if (lowerText.includes('proud') || lowerText.includes('accomplish')) {
        detectedMood = 'proud';
    } else if (lowerText.includes('creative') || lowerText.includes('imagine') || lowerText.includes('art')) {
        detectedMood = 'creative';
    }
    
    // Only update mood and background if there's a significant change in text and detected mood differs
    if (text.length > 50 && detectedMood !== currentMood) {
      updateBackgroundForMood(detectedMood);
    }
  };

  // Auto-focus textarea
  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Enhanced prompt generation with mood-based backgrounds
  const showPrompt = (category = null, isWhisper = false) => {
    let promptsToUse;
    
    if (isWhisper) {
      promptsToUse = promptCategories.whisper;
    } else if (category && category !== 'all') {
      promptsToUse = promptCategories[category];
    } else {
      promptsToUse = allPrompts;
    }
    
    let next;
    let newPrompt;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      next = Math.floor(Math.random() * promptsToUse.length);
      newPrompt = promptsToUse[next];
      attempts++;
    } while (
      newPrompt.text === (promptIndex >= 0 ? allPrompts[promptIndex]?.text : null) && 
      promptsToUse.length > 1 &&
      attempts < maxAttempts
    );
    
    const selectedPrompt = newPrompt;
    const promptInAllPrompts = allPrompts.findIndex(p => p.text === selectedPrompt.text);
    setPromptIndex(promptInAllPrompts);
    setPromptCount(prev => prev + 1);
    
    // Update background based on prompt mood (if not in lantern mode)
    if (selectedPrompt.mood) {
      updateBackgroundForMood(selectedPrompt.mood);
    }
    
    // Surprise trigger (every 10th prompt)
    if (promptCount > 0 && (promptCount + 1) % 10 === 0) { 
      setTimeout(() => triggerSurprise(), 2000);
    }
    
    focusTextarea();
  };

  // Surprise element trigger with Porsche
  const triggerSurprise = () => {
    setShowSurprise(true);
    setShowPorsche(true);
    showNotification("🎉 Surprise! You've been consistent with your journaling - like the precision of a Porsche 911!", 6000);
    // Temporarily set background to Porsche image if not in lantern mode
    if (!lanternMode) setBackgroundImage(porscheImageUrl);
    setTimeout(() => {
      setShowSurprise(false);
      setShowPorsche(false);
      // Revert to current mood background after surprise if not in lantern mode
      if (!lanternMode) updateBackgroundForMood(currentMood); 
    }, 6000);
  };

  // Manual Porsche surprise
  const triggerPorscheSurprise = () => {
    setShowPorsche(true);
    if (!lanternMode) setBackgroundImage(porscheImageUrl);
    showNotification("🏎️ Sometimes beauty appears in unexpected moments... like a perfectly engineered machine.", 5000);
    setTimeout(() => {
      setShowPorsche(false);
      if (!lanternMode) updateBackgroundForMood(currentMood); 
    }, 5000);
  };

  // Enhanced save with metadata
  const saveEntry = () => {
    if (!currentEntry.trim()) {
      showNotification('✍️ Please write something before saving!');
      return;
    }

    const wordCount = currentEntry.trim().split(/\s+/).length;
    const charCount = currentEntry.length;
    const estimatedReadTime = Math.ceil(wordCount / 225); 

    const newEntry = {
      id: Date.now(), 
      content: currentEntry,
      date: new Date().toISOString(),
      prompt: promptIndex >= 0 ? allPrompts[promptIndex] : null, 
      wordCount,
      charCount,
      estimatedReadTime,
      mood: currentMood, 
      backgroundUsed: backgroundImage, 
      tags: extractTags(currentEntry) 
    };

    setEntries(prev => [newEntry, ...prev]); 
    setCurrentEntry(''); 
    setPromptIndex(-1); 
    localStorage.removeItem('journal_draft'); 
    showNotification('✅ Entry saved successfully!');
    
    // Achievement notifications
    const newTotalEntries = entries.length + 1;
    if (newTotalEntries === 5) {
      setTimeout(() => showNotification('🌟 Achievement: 5 entries! You\'re building a beautiful practice.'), 1500);
    } else if (newTotalEntries === 10) {
      setTimeout(() => showNotification('🏆 Achievement: 10 entries! Your healing journey is taking shape.'), 1500);
    }
  };

  // Auto-save functionality
  const autoSave = () => {
    if (currentEntry.trim() && currentEntry.length > 50) { 
      const draft = {
        content: currentEntry,
        timestamp: new Date().toISOString(),
        prompt: promptIndex >= 0 ? allPrompts[promptIndex] : null,
        mood: currentMood
      };
      localStorage.setItem('journal_draft', JSON.stringify(draft));
      showNotification('📝 Draft auto-saved', 2000); 
    }
  };

  // Extract hashtags and keywords
  const extractTags = (text) => {
    const hashtags = text.match(/#\w+/g) || [];
    const keywords = ['happy', 'sad', 'angry', 'peaceful', 'anxious', 'grateful', 'hopeful', 'frustrated', 'calm', 'excited', 'love', 'fear', 'joy', 'stress', 'growth', 'healing', 'mindfulness', 'self-care', 'inspiration', 'challenge', 'success', 'failure'];
    const foundKeywords = keywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );
    return [...new Set([...hashtags, ...foundKeywords])]; // Return unique tags
  };

  // Enhanced download with better formatting
  const downloadEntry = () => {
    if (!currentEntry.trim()) {
      showNotification('❌ No content to download!');
      return;
    }

    const timestamp = new Date().toLocaleString();
    const wordCount = currentEntry.trim().split(/\s+/).length;
    const prompt = promptIndex >= 0 ? allPrompts[promptIndex] : null;
    
    const header = `
NORTHERN JOURNAL ENTRY
======================
Date: ${timestamp}
Words: ${wordCount}
Mood: ${currentMood}
${prompt ? `Prompt: ${prompt.text}\nSource: ${prompt.credit}\n` : ''}
Tags: ${extractTags(currentEntry).join(', ') || 'None'}
======================

`;

    const content = header + currentEntry + '\n\n---\nGenerated by Northern Journal - Veenkoti Studios\n"Healing begins in silence."';
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `northern-journal-${new Date().toISOString().split('T')[0]}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(a.href); 
    showNotification('📥 Entry downloaded successfully!');
  };

  // Download all entries with enhanced formatting
  const downloadAllEntries = () => {
    if (entries.length === 0) {
      showNotification('❌ No entries to download!');
      return;
    }

    const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0);
    const header = `
NORTHERN JOURNAL - COMPLETE COLLECTION
=====================================
Total Entries: ${entries.length}
Total Words: ${totalWords}
Export Date: ${new Date().toLocaleString()}
=====================================

`;

    const content = entries.map((entry, index) => {
      const date = new Date(entry.date).toLocaleString();
      const prompt = entry.prompt ? `Prompt: ${entry.prompt.text}\n` : '';
      const metadata = `Words: ${entry.wordCount} | Characters: ${entry.charCount || 'N/A'} | Read Time: ${entry.estimatedReadTime || 'N/A'} min | Mood: ${entry.mood || 'N/A'}`;
      const tags = entry.tags && entry.tags.length > 0 ? `Tags: ${entry.tags.join(', ')}\n` : '';
      
      return `ENTRY ${entries.length - index}
${'-'.repeat(50)}
Date: ${date}
${prompt}${metadata}
${tags}
${entry.content}

${'='.repeat(50)}

`;
    }).join('');

    const footer = '\n---\nGenerated by Northern Journal - Veenkoti Studios\n"Healing begins in silence."';
    const fullContent = header + content + footer;

    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `northern-journal-complete-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    showNotification('📤 All entries downloaded!');
  };

  // Enhanced copy with formatting
  const copyEntry = () => {
    if (!currentEntry.trim()) {
      showNotification('❌ No content to copy!');
      return;
    }
    
    const prompt = promptIndex >= 0 ? `Prompt: ${allPrompts[promptIndex].text}\n\n` : '';
    const timestamp = `Written on ${new Date().toLocaleString()}\nMood: ${currentMood}\n\n`;
    const fullContent = timestamp + prompt + currentEntry;
    
    navigator.clipboard.writeText(fullContent).then(() => {
      showNotification('📋 Entry copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      showNotification('❌ Failed to copy to clipboard. Please try manually.');
    });
  };

  // Delete entry with confirmation
  const deleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
      showNotification('🗑️ Entry deleted.');
    }
  };

  // Clear all entries with strong confirmation
  const clearAllEntries = () => {
    if (window.confirm('Are you absolutely sure you want to delete ALL your journal entries? This action cannot be undone.')) {
      if (window.confirm('This is the final warning: All data will be permanently lost. Proceed?')) {
        setEntries([]);
        localStorage.removeItem('journal_entries');
        localStorage.removeItem('journal_draft');
        showNotification('🗑️ All journal entries have been cleared.');
      }
    }
  };

  // Filtered entries for history view
  const filteredEntries = entries.filter(entry => 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.prompt && entry.prompt.text.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (entry.mood && entry.mood.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="App" style={{ 
      // Conditional background based on lanternMode
      backgroundImage: lanternMode ? 'none' : `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      color: '#ECEFF1', // Light gray/blue from your original
      textShadow: '1px 1px 3px rgba(0,0,0,0.7)', 
      transition: 'background-image 2s ease-in-out',
      position: 'relative', // Needed for video overlay
    }}>
      {/* Lantern Mode Video Background */}
      {lanternMode && (
        <video 
          ref={videoRef} 
          loop 
          muted 
          playsInline // 'playsInline' is important for mobile autoplay
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: -1, // Ensures video is behind content
            opacity: 0.8, // Slightly fade the video
            filter: 'brightness(0.7)' // Darken the video for readability
          }}
        >
          <source src={lanternVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Porsche Surprise */}
      {showPorsche && (
        <div className="porsche-surprise-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000,
          opacity: showSurprise ? 1 : 0, // Control opacity for fade effect
          transition: 'opacity 0.5s ease-in-out',
        }}>
          <img src={porscheImageUrl} alt="Porsche 911" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
          <button onClick={() => setShowPorsche(false)} style={{
            position: 'absolute', top: '20px', right: '20px', padding: '10px 15px',
            background: 'rgba(255, 255, 255, 0.3)', color: 'white', border: 'none',
            borderRadius: '5px', cursor: 'pointer', fontSize: '1em', zIndex: 1001
          }}>Close</button>
        </div>
      )}

      <header style={headerStyle}>
        <h1 style={titleStyle}>Northern Journal</h1>
        <div style={dateTimeStyle}>
          <span>{getFormattedDate()}</span>
          <span>{getFormattedTime()}</span>
        </div>
      </header>

      <main style={mainContentStyle}>
        {!showHistory ? (
          <div style={journalAreaStyle}>
            {promptIndex >= 0 && (
              <div style={promptBoxStyle}>
                <p style={{fontStyle: 'italic', marginBottom: '5px'}}>{allPrompts[promptIndex].text}</p>
                <span style={{fontSize: '0.8em', opacity: 0.8}}>- {allPrompts[promptIndex].credit}</span>
              </div>
            )}
            
            <textarea
              ref={textareaRef}
              value={currentEntry}
              onChange={handleTextChange}
              placeholder="What's on your mind today? Let the words flow..."
              style={textareaStyle}
            />

            {isTyping && <div style={typingIndicatorStyle}>Typing...</div>}

            <div style={buttonContainerStyle}>
              {/* Category Dropdown */}
              <div style={{position: 'relative'}}>
                  <button onClick={() => setShowCategories(!showCategories)} style={buttonStyle}>
                      {selectedCategory === 'all' ? 'Categories ▼' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} ▼`}
                  </button>
                  {showCategories && (
                      <div style={categoryDropdownStyle}>
                          <button onClick={() => { setSelectedCategory('all'); showPrompt('all'); setShowCategories(false); }} style={dropdownItemStyle}>All Prompts</button>
                          {Object.keys(promptCategories).filter(cat => cat !== 'whisper').map(category => ( // Filter out whisper from main list
                              <button 
                                  key={category} 
                                  onClick={() => { setSelectedCategory(category); showPrompt(category); setShowCategories(false); }} 
                                  style={dropdownItemStyle}
                              >
                                  {category.charAt(0).toUpperCase() + category.slice(1)}
                              </button>
                          ))}
                      </div>
                  )}
              </div>
              <button onClick={() => showPrompt()} style={buttonStyle}>New Prompt</button>
              <button onClick={() => showPrompt(null, true)} style={buttonStyle}>Whisper Prompt</button> {/* Moved closer to textarea controls */}
              <button onClick={saveEntry} style={buttonStyle}>Save Entry</button>
              <button onClick={downloadEntry} style={buttonStyle}>Download Current</button>
              <button onClick={copyEntry} style={buttonStyle}>Copy Current</button>
            </div>
          </div>
        ) : (
          <div style={historyAreaStyle}>
            <h2 style={{textAlign: 'center', color: '#B3E5FC'}}>Journal History</h2>
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchBarStyle}
            />
            <div style={historyListStyle}>
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <div key={entry.id} style={entryCardStyle}>
                    <h3 style={{margin: '0 0 5px 0', color: '#80DEEA'}}>
                      {new Date(entry.date).toLocaleDateString()} - 
                      {entry.prompt ? ` Prompt: "${entry.prompt.text.substring(0, 50)}..."` : ' Untitled'}
                    </h3>
                    <p style={{fontSize: '0.9em', opacity: 0.8, marginBottom: '10px'}}>
                      Mood: {entry.mood || 'N/A'} | Words: {entry.wordCount} | Read: {entry.estimatedReadTime} min
                      {entry.tags && entry.tags.length > 0 && ` | Tags: ${entry.tags.join(', ')}`}
                    </p>
                    <p style={entryContentStyle}>{entry.content.substring(0, 300)}{entry.content.length > 300 ? '...' : ''}</p>
                    <div style={entryActionsStyle}>
                      <button onClick={() => alert(`Full Entry:\n\n${new Date(entry.date).toLocaleString()}\n${entry.prompt ? 'Prompt: ' + entry.prompt.text + '\n' : ''}\n${entry.content}\n\nWords: ${entry.wordCount}\nMood: ${entry.mood}`)} style={entryActionButton}>Read Full</button>
                      <button onClick={() => deleteEntry(entry.id)} style={{ ...entryActionButton, backgroundColor: '#EF5350' }}>Delete</button> {/* Red color */}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{textAlign: 'center', opacity: 0.7, color: '#B0BEC5'}}>No entries found. Start journaling!</p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer style={footerStyle}>
        <div style={footerButtonsStyle}>
          <button onClick={() => setShowHistory(!showHistory)} style={buttonStyle}>
            {showHistory ? 'Back to Journal' : 'View History'}
          </button>
          {/* Toggle between dynamic background and lantern mode */}
          <button onClick={() => setLanternMode(prev => !prev)} style={buttonStyle}>
            <img src={pineIconUrl} alt="Lantern" style={{ height: '1.2em', verticalAlign: 'middle', marginRight: '5px' }} />
            {lanternMode ? 'Dynamic Backgrounds' : 'Lantern Mode'}
          </button>
          <button onClick={downloadAllEntries} style={buttonStyle}>Download All Entries</button>
          <button onClick={clearAllEntries} style={{...buttonStyle, backgroundColor: '#EF5350', border: '1px solid #EF5350'}}>Clear All Data</button>
          <button onClick={triggerPorscheSurprise} style={buttonStyle}>Porsche Surprise</button>
        </div>
        <p style={{marginTop: '10px', fontSize: '0.9em', opacity: 0.8}}>
          "Healing begins in silence." | &copy; 2024 Veenkoti Studios
        </p>
        {notification && <div style={notificationStyle}>{notification}</div>}
      </footer>
    </div>
  );
}

// --- Inline Styles (Refined to match original aesthetic and fix issues) ---

const commonButtonStyles = {
  background: '#333333', // Dark background for buttons
  color: '#B0BEC5', // Light gray text for buttons
  border: '1px solid #607D8B', // A slightly lighter gray border
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1em',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease, transform 0.2s ease, border-color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
  minWidth: '150px', // Ensure consistent button width
  whiteSpace: 'nowrap', // Prevent text wrapping
  '&:hover': { // This pseudo-class syntax doesn't work directly in inline styles, only for reference
    background: '#455A64', // Slightly lighter on hover
    transform: 'translateY(-2px)',
    borderColor: '#78909C',
  },
  '&:active': { // For reference
    transform: 'translateY(0)',
  },
};

const headerStyle = {
  textAlign: 'center',
  padding: '20px',
  background: 'rgba(0,0,0,0.6)', // Increased opacity slightly for header
  backdropFilter: 'blur(8px)', // Increased blur for header
  borderRadius: '0 0 15px 15px',
  marginBottom: '20px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
};

const titleStyle = {
  fontSize: '3em', // Slightly larger title
  margin: '0',
  letterSpacing: '3px', // Increased letter spacing
  fontWeight: 'lighter', // Lighter font weight for a softer look
  color: '#80DEEA', // Light blue-green for the title
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', // Modern font stack
};

const dateTimeStyle = {
  fontSize: '1.2em', // Slightly larger date/time
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px', // Increased gap
  opacity: 0.9,
  color: '#CFD8DC', // Lighter gray for date/time
};

const mainContentStyle = {
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '20px',
};

const journalAreaStyle = {
  background: 'rgba(0,0,0,0.6)', // Increased opacity for main area
  backdropFilter: 'blur(12px)', // Stronger blur
  padding: '30px',
  borderRadius: '15px',
  width: '100%',
  maxWidth: '850px', // Slightly wider journal area
  boxShadow: '0 0 25px rgba(0,0,0,0.6)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid rgba(128, 222, 234, 0.3)', // Subtle border matching title color
};

const promptBoxStyle = {
  background: 'rgba(128, 222, 234, 0.1)', // Light blue-green tint with opacity
  padding: '18px 25px', // More padding
  borderRadius: '10px',
  marginBottom: '25px', // More space below prompt
  width: '100%',
  textAlign: 'center',
  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)',
  borderLeft: '5px solid #80DEEA', // Solid border accent
  color: '#E0F7FA', // Very light blue text for prompt
  lineHeight: '1.5',
};

const textareaStyle = {
  width: 'calc(100% - 40px)', // Adjust for padding
  height: '300px', // Taller textarea
  padding: '20px',
  borderRadius: '10px',
  border: '1px solid rgba(128, 222, 234, 0.4)', // Accent color border
  background: 'rgba(0,0,0,0.3)', // Darker background for textarea
  color: '#E0F7FA', // Lightest text color for readability
  fontSize: '1.1em',
  lineHeight: '1.8', // More line spacing
  resize: 'vertical',
  marginBottom: '20px',
  boxShadow: 'inset 0 0 12px rgba(0,0,0,0.4)',
  fontFamily: 'inherit',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  outline: 'none', // Remove default outline
  '&:focus': { // Note: for true `:focus` effect, use a CSS file or styled-components
    borderColor: '#80DEEA',
    boxShadow: 'inset 0 0 15px rgba(128, 222, 234, 0.2)',
  }
};

const buttonContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  justifyContent: 'center',
  width: '100%',
};

const buttonStyle = { ...commonButtonStyles }; // Apply common styles

const categoryDropdownStyle = {
    position: 'absolute',
    top: 'calc(100% + 5px)', // Position below the button
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.9)', // More opaque background
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
    zIndex: 20, // Higher z-index to ensure it's on top
    display: 'flex',
    flexDirection: 'column',
    minWidth: '180px', // Wider dropdown
    border: '1px solid #4DB6AC', // Subtle border
    maxHeight: '300px', // Limit height for scroll if many categories
    overflowY: 'auto',
    opacity: 1, // Ensure full opacity for visibility
    transition: 'opacity 0.2s ease-in-out',
};

const dropdownItemStyle = {
    background: 'transparent',
    color: '#CFD8DC', // Light gray text for readability
    border: 'none',
    padding: '12px 18px',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '1em',
    width: '100%',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    '&:hover': { // For reference
        background: 'rgba(77, 182, 172, 0.2)', // Hint of accent color on hover
        color: '#E0F7FA',
    },
    '&:first-of-type': { // For reference
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
    },
    '&:last-of-type': { // For reference
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
    },
};

const typingIndicatorStyle = {
    fontSize: '0.9em',
    opacity: 0.7,
    marginTop: '10px',
    color: '#80DEEA', // Accent color
};

const historyAreaStyle = {
  background: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(12px)',
  padding: '30px',
  borderRadius: '15px',
  width: '100%',
  maxWidth: '900px',
  boxShadow: '0 0 25px rgba(0,0,0,0.6)',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(128, 222, 234, 0.3)',
};

const searchBarStyle = {
  width: 'calc(100% - 40px)',
  padding: '12px 20px',
  marginBottom: '20px',
  borderRadius: '8px',
  border: '1px solid rgba(128, 222, 234, 0.4)',
  background: 'rgba(0,0,0,0.3)',
  color: '#E0F7FA',
  fontSize: '1em',
  boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)',
  outline: 'none',
};

const historyListStyle = {
  maxHeight: '60vh',
  overflowY: 'auto',
  paddingRight: '10px',
};

const entryCardStyle = {
  background: 'rgba(0,0,0,0.4)', // Slightly darker background for cards
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '15px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
  borderLeft: '4px solid #4DB6AC', // A calming accent color
  color: '#CFD8DC', // Default text for cards
};

const entryContentStyle = {
  fontSize: '1em',
  lineHeight: '1.6',
  marginBottom: '15px',
  maxHeight: '100px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '4',
  WebkitBoxOrient: 'vertical',
  color: '#E0F7FA', // Lighter text for content snippet
};

const entryActionsStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
};

const entryActionButton = {
  ...commonButtonStyles, // Inherit base button styles
  padding: '8px 15px',
  fontSize: '0.9em',
  background: '#4DB6AC', // Accent color for action buttons
  border: '1px solid #4DB6AC',
  '&:hover': { // For reference
    background: '#26A69A',
    borderColor: '#26A69A',
  }
};

const footerStyle = {
  textAlign: 'center',
  padding: '20px',
  background: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(8px)',
  borderRadius: '15px 15px 0 0',
  marginTop: '20px',
  boxShadow: '0 -4px 10px rgba(0,0,0,0.5)',
};

const footerButtonsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  justifyContent: 'center',
  marginBottom: '10px',
};

const notificationStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(0,0,0,0.85)', // Slightly more opaque for prominence
  color: '#B0BEC5',
  padding: '12px 25px', // More padding
  borderRadius: '8px',
  zIndex: 1000,
  fontSize: '1em',
  boxShadow: '0 2px 12px rgba(0,0,0,0.6)',
  border: '1px solid #80DEEA', // Accent border
  animation: 'fadeInOut 4s forwards', // This still needs to be in a global CSS file
};

export default App;