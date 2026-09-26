// Centralized API configuration & Fetch helper with Smart Cloud Fallback
// Ensures Glory of the Past works 100% seamlessly on Vercel, Localhost, Network IP, Mobile & Cloudflare Tunnel
const API_BASE_URL = (!window.location.port || window.location.port === '5203')
    ? `${window.location.origin}/api`
    : `${window.location.protocol}//${window.location.hostname}:5203/api`;

// Rich Historical Fallback Dataset (Used seamlessly when backend is unreachable or on standalone Vercel hosting)
const FALLBACK_DATA = {
    categories: [
        {
            id: 1,
            name: "Ancient Civilizations",
            description: "Indus Valley, Vedic period, Maurya Empire, Ancient Greece, Egypt, and Rome (< 500 CE).",
            imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
            eventsCount: 4
        },
        {
            id: 2,
            name: "Medieval Empires & Dynasties",
            description: "Chola maritime empire, Mughal era, Maratha Empire, Rajput valor, and Byzantine heights (500 - 1700 CE).",
            imageUrl: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800",
            eventsCount: 5
        },
        {
            id: 3,
            name: "Freedom Movements & Revolutions",
            description: "1857 Uprising, Indian Independence struggle, American & French Revolutions (1700 - 1950 CE).",
            imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800",
            eventsCount: 4
        },
        {
            id: 4,
            name: "World Wars & Modern Era",
            description: "World War I & II, Space Race, Cold War, and Global Technological Revolutions (1914 - Present).",
            imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800",
            eventsCount: 3
        }
    ],
    events: [
        {
            id: 1,
            title: "The Kalinga War & Ashoka's Transformation",
            year: -261,
            formattedDate: "261 BCE",
            summary: "Fought between the Maurya Empire under Ashoka and the state of Kalinga. The catastrophic loss of life moved Emperor Ashoka to renounce war and embrace Buddhism and non-violence.",
            description: "The Kalinga War was fought between the Maurya Empire under Ashoka the Great and the state of Kalinga (modern-day Odisha). It resulted in over 100,000 casualties and the exile of 150,000 people. Viewing the carnage along the Daya River, Ashoka felt intense remorse. This watershed moment led him to convert to Buddhism, proclaim the Edicts of Ashoka, and send peace missions across Asia and the Mediterranean.",
            location: "Dhauli, Kalinga (Odisha, India)",
            imageUrl: "event-kalinga-war.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
            categoryId: 1,
            categoryName: "Ancient Civilizations",
            isFeatured: true
        },
        {
            id: 2,
            title: "Coronation of Chhatrapati Shivaji Maharaj",
            year: 1674,
            formattedDate: "6 June 1674 CE",
            summary: "Shivaji was crowned Chhatrapati of the Maratha Empire at Raigad Fort, establishing Hindavi Swarajya and pioneering innovative naval and guerrilla warfare.",
            description: "On 6 June 1674, Shivaji Bhonsle was formally consecrated as Chhatrapati (Paramount Sovereign) at Raigad Fort by Pandit Gaga Bhatt. This historic coronation broke centuries of Mughal and Sultanate hegemony in the Deccan, established Hindavi Swarajya (self-rule), introduced an independent currency (Shivrai hon), and institutionalized the Council of Eight Ministers (Ashta Pradhan).",
            location: "Raigad Fort, Maharashtra, India",
            imageUrl: "event-shivaji-coronation.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800",
            categoryId: 2,
            categoryName: "Medieval Empires & Dynasties",
            isFeatured: true
        },
        {
            id: 3,
            title: "Dandi Salt March & Civil Disobedience",
            year: 1930,
            formattedDate: "12 March - 6 April 1930 CE",
            summary: "Mahatma Gandhi led a 240-mile non-violent march from Sabarmati to Dandi to produce salt from seawater in defiance of British monopoly.",
            description: "The Salt March (Salt Satyagraha) was an act of non-violent civil disobedience led by Mohandas Gandhi against the British salt monopoly in colonial India. Over 24 days, Gandhi and 78 initial satyagrahis walked 240 miles from Sabarmati Ashram to the coastal village of Dandi. Making salt from seawater galvanized millions across India and brought international press attention to the Indian Independence Movement.",
            location: "Sabarmati to Dandi, Gujarat, India",
            imageUrl: "event-dandi-march.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800",
            categoryId: 3,
            categoryName: "Freedom Movements & Revolutions",
            isFeatured: true
        },
        {
            id: 4,
            title: "The First War of Indian Independence (Revolt of 1857)",
            year: 1857,
            formattedDate: "10 May 1857 CE",
            summary: "A major uprising against the rule of the British East India Company, led by Mangal Pandey, Rani Lakshmibai, Bahadur Shah Zafar, and Tatya Tope.",
            description: "The Rebellion of 1857 erupted across northern and central India. Beginning as a mutiny of sepoys of the East India Company's army at Meerut, it escalated into a widespread civilian uprising. It resulted in the end of East India Company rule and the formal transfer of power to the British Crown under Queen Victoria.",
            location: "Meerut, Delhi, Jhansi, Kanpur, India",
            imageUrl: "lakshmibai.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800",
            categoryId: 3,
            categoryName: "Freedom Movements & Revolutions",
            isFeatured: false
        },
        {
            id: 5,
            title: "Indus Valley Civilization & Urban Revolution",
            year: -2500,
            formattedDate: "c. 2500 BCE",
            summary: "A Bronze Age civilization known for advanced baked brick houses, sophisticated drainage systems, and water supply grids.",
            description: "The Indus Valley Civilization (Harappan Civilization) flourished in the basins of the Indus River. Known for pioneering municipal town planning, standardized weights, public baths (Great Bath of Mohenjo-Daro), and dockyards at Lothal, it was one of the three early cradles of Old World civilization.",
            location: "Harappa, Mohenjo-Daro, Lothal, Dholavira",
            imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
            fallbackImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
            categoryId: 1,
            categoryName: "Ancient Civilizations",
            isFeatured: false
        }
    ],
    persons: [
        {
            id: 1,
            fullName: "Chhatrapati Shivaji Maharaj",
            titleOrRole: "Founder of the Maratha Empire",
            birthDeathDisplay: "1630 - 1680 CE",
            era: "Medieval India",
            biography: "Chhatrapati Shivaji Maharaj was an Indian warrior king and founder of the Maratha Empire. In 1674, he was formally crowned Chhatrapati at Raigad Fort. He pioneered Ganimi Kava (guerrilla tactics) and built a formidable navy, earning the title 'Father of the Indian Navy'.",
            keyAchievements: "Pioneered Ganimi Kava; Crowned Chhatrapati at Raigad (1674); Father of Indian Navy; Established Swarajya.",
            imageUrl: "shivaji.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
            isFeatured: true
        },
        {
            id: 2,
            fullName: "Ashoka the Great",
            titleOrRole: "Third Emperor of the Maurya Dynasty",
            birthDeathDisplay: "304 BCE - 232 BCE",
            era: "Ancient India",
            biography: "Ashoka ruled almost all of the Indian subcontinent. The brutal carnage of the Kalinga War led him to renounce violence, embrace Buddhism, and champion welfare and non-violence through rock and pillar edicts.",
            keyAchievements: "Unified the subcontinent; Spread Buddhism globally; Commissioned Ashoka Edicts and the Lion Capital (National Emblem of India).",
            imageUrl: "ashoka.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
            isFeatured: true
        },
        {
            id: 3,
            fullName: "Mahatma Gandhi",
            titleOrRole: "Father of the Nation & Apostle of Non-Violence",
            birthDeathDisplay: "1869 - 1948 CE",
            era: "Modern Era",
            biography: "Mohandas Karamchand Gandhi led India's non-violent freedom movement through Satyagraha, Non-Cooperation, the Salt March, and Quit India, inspiring civil rights leaders worldwide.",
            keyAchievements: "Led Dandi Salt March (1930); Pioneer of Satyagraha & Ahimsa; Inspired Martin Luther King Jr. and Nelson Mandela.",
            imageUrl: "gandhi.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800",
            isFeatured: true
        },
        {
            id: 4,
            fullName: "Rani Lakshmibai",
            titleOrRole: "Queen of Jhansi & Hero of 1857 Revolt",
            birthDeathDisplay: "1828 - 1858 CE",
            era: "Modern Era",
            biography: "One of the leading figures of the 1857 rebellion. Defying the British Doctrine of Lapse, she led her soldiers into fierce combat at Jhansi and Gwalior, becoming an immortal symbol of courage.",
            keyAchievements: "Heroic defense of Jhansi; Commander in 1857 Freedom Struggle; Immortalized as 'Khoob Ladi Mardani'.",
            imageUrl: "lakshmibai.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800",
            isFeatured: true
        },
        {
            id: 5,
            fullName: "Netaji Subhas Chandra Bose",
            titleOrRole: "Supreme Commander of Indian National Army",
            birthDeathDisplay: "1897 - 1945 CE",
            era: "Modern Era",
            biography: "Charismatic nationalist leader who formed the Azad Hind Fauj (INA) to liberate India by military force during World War II.",
            keyAchievements: "Formed Azad Hind Fauj; Popularized 'Jai Hind' and 'Give me blood, and I shall give you freedom!'.",
            imageUrl: "subhas_bose.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800",
            isFeatured: true
        },
        {
            id: 6,
            fullName: "Dr. A.P.J. Abdul Kalam",
            titleOrRole: "11th President of India & Missile Man",
            birthDeathDisplay: "1931 - 2015 CE",
            era: "Contemporary Era",
            biography: "Renowned aerospace scientist and the 'People's President'. He played a pivotal role in India's civilian space programme and missile development.",
            keyAchievements: "Architect of Agni & Prithvi missiles; Key figure in Pokhran-II tests; Authored 'Wings of Fire'; Bharat Ratna laureate.",
            imageUrl: "abdul_kalam.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
            isFeatured: true
        }
    ],
    places: [
        {
            id: 1,
            name: "Taj Mahal",
            country: "India",
            cityOrRegion: "Agra, Uttar Pradesh",
            builtYear: "1632 - 1653 CE",
            historicalSignificance: "Pinnacle of Mughal marble architecture built by Shah Jahan in memory of Mumtaz Mahal. One of the New 7 Wonders of the World.",
            imageUrl: "taj_mahal.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
            isFeatured: true
        },
        {
            id: 2,
            name: "Raigad Fort",
            country: "India",
            cityOrRegion: "Mahad, Maharashtra",
            builtYear: "1674 CE (Capital established)",
            historicalSignificance: "Gibraltar of the East and capital of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
            imageUrl: "raigad_fort.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800",
            isFeatured: true
        },
        {
            id: 3,
            name: "Red Fort (Lal Qila)",
            country: "India",
            cityOrRegion: "Old Delhi, India",
            builtYear: "1639 - 1648 CE",
            historicalSignificance: "Historic seat of Mughal power designed by Ustad Ahmad Lahori. Site of the Prime Minister's Independence Day address.",
            imageUrl: "red_fort.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
            isFeatured: true
        },
        {
            id: 4,
            name: "Ajanta & Ellora Caves",
            country: "India",
            cityOrRegion: "Chhatrapati Sambhajinagar, Maharashtra",
            builtYear: "2nd Century BCE - 10th Century CE",
            historicalSignificance: "Masterpieces of rock-cut architecture featuring Kailash Temple and ancient Buddhist frescoes.",
            imageUrl: "ajanta_caves.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
            isFeatured: true
        },
        {
            id: 5,
            name: "Konark Sun Temple",
            country: "India",
            cityOrRegion: "Puri, Odisha",
            builtYear: "1250 CE",
            historicalSignificance: "Colossal chariot-shaped temple dedicated to Surya, built by King Narasimhadeva I of the Eastern Ganga Dynasty.",
            imageUrl: "konark_temple.jpg",
            fallbackImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
            isFeatured: true
        }
    ],
    quizzes: [
        {
            id: 1,
            title: "Ancient & Medieval Indian History Challenge",
            description: "Test your mastery on Ashoka, Chhatrapati Shivaji Maharaj, monumental architecture, and independence milestones.",
            totalQuestions: 5,
            questions: [
                {
                    id: 101,
                    text: "Which battle moved Emperor Ashoka to renounce war and embrace Buddhism?",
                    options: [
                        { id: 1, text: "Battle of Panipat", isCorrect: false },
                        { id: 2, text: "The Kalinga War", isCorrect: true },
                        { id: 3, text: "Battle of Hydaspes", isCorrect: false },
                        { id: 4, text: "Battle of Haldighati", isCorrect: false }
                    ]
                },
                {
                    id: 102,
                    text: "In which fort was Chhatrapati Shivaji Maharaj formally crowned in 1674?",
                    options: [
                        { id: 5, text: "Shivneri Fort", isCorrect: false },
                        { id: 6, text: "Raigad Fort", isCorrect: true },
                        { id: 7, text: "Pratapgad Fort", isCorrect: false },
                        { id: 8, text: "Sinhagad Fort", isCorrect: false }
                    ]
                },
                {
                    id: 103,
                    text: "Who led the 240-mile Salt Satyagraha March from Sabarmati to Dandi in 1930?",
                    options: [
                        { id: 9, text: "Subhas Chandra Bose", isCorrect: false },
                        { id: 10, text: "Sardar Vallabhbhai Patel", isCorrect: false },
                        { id: 11, text: "Mahatma Gandhi", isCorrect: true },
                        { id: 12, text: "Bhagat Singh", isCorrect: false }
                    ]
                },
                {
                    id: 104,
                    text: "The Lion Capital of Ashoka, which serves as the National Emblem of India, was erected at which sacred site?",
                    options: [
                        { id: 13, text: "Sarnath", isCorrect: true },
                        { id: 14, text: "Bodh Gaya", isCorrect: false },
                        { id: 15, text: "Kushinagar", isCorrect: false },
                        { id: 16, text: "Pataliputra", isCorrect: false }
                    ]
                },
                {
                    id: 105,
                    text: "Which aerospace scientist was known as the 'People's President' of India?",
                    options: [
                        { id: 17, text: "Homi Bhabha", isCorrect: false },
                        { id: 18, text: "Dr. A.P.J. Abdul Kalam", isCorrect: true },
                        { id: 19, text: "Vikram Sarabhai", isCorrect: false },
                        { id: 20, text: "C.V. Raman", isCorrect: false }
                    ]
                }
            ]
        }
    ]
};

// Dispatch helper for intelligent fallback resolution
function resolveFallback(endpoint, method = 'GET', data = null) {
    const cleanEp = endpoint.toLowerCase().split('?')[0];

    // Categories
    if (cleanEp === '/categories') return FALLBACK_DATA.categories;

    // Events
    if (cleanEp === '/events/featured') return FALLBACK_DATA.events.filter(e => e.isFeatured);
    if (cleanEp === '/events') return FALLBACK_DATA.events;
    if (cleanEp.startsWith('/events/')) {
        const id = parseInt(cleanEp.replace('/events/', ''));
        return FALLBACK_DATA.events.find(e => e.id === id) || FALLBACK_DATA.events[0];
    }

    // Persons
    if (cleanEp === '/persons/featured') return FALLBACK_DATA.persons.filter(p => p.isFeatured);
    if (cleanEp === '/persons') return FALLBACK_DATA.persons;
    if (cleanEp.startsWith('/persons/')) {
        const id = parseInt(cleanEp.replace('/persons/', ''));
        return FALLBACK_DATA.persons.find(p => p.id === id) || FALLBACK_DATA.persons[0];
    }

    // Places
    if (cleanEp === '/places/featured' || cleanEp === '/places') return FALLBACK_DATA.places;
    if (cleanEp.startsWith('/places/')) {
        const id = parseInt(cleanEp.replace('/places/', ''));
        return FALLBACK_DATA.places.find(p => p.id === id) || FALLBACK_DATA.places[0];
    }

    // Quizzes
    if (cleanEp === '/quizzes' || cleanEp === '/quiz') return FALLBACK_DATA.quizzes;
    if (cleanEp.startsWith('/quizzes/') || cleanEp.startsWith('/quiz/')) {
        return FALLBACK_DATA.quizzes[0];
    }

    // AI Chat simulation if backend offline
    if (cleanEp.includes('/ai/') || cleanEp.includes('/chat')) {
        const query = (data?.message || data?.query || '').toLowerCase();
        let reply = "Greetings! I am Dr. Aditi, your Senior AI Historian. Human history is a vast and fascinating tapestry. ";
        
        if (query.includes('kalinga') || query.includes('ashoka')) {
            reply += "The Kalinga War (261 BCE) was a watershed moment. Witnessing the immense bloodshed along the Daya river, Emperor Ashoka underwent a spiritual revolution, embraced Buddhism, and spread messages of peace and Dhamma across Asia.";
        } else if (query.includes('shivaji') || query.includes('maratha') || query.includes('coronation')) {
            reply += "Chhatrapati Shivaji Maharaj was formally crowned at Raigad Fort on 6 June 1674. He established Hindavi Swarajya, pioneered guerrilla tactics (Ganimi Kava), and built a formidable navy protecting the Konkan coast.";
        } else if (query.includes('gandhi') || query.includes('salt') || query.includes('dandi')) {
            reply += "The Dandi Salt March took place in 1930. Mahatma Gandhi and his followers walked 240 miles to produce salt in defiance of British monopolies, demonstrating the formidable power of non-violent civil disobedience.";
        } else if (query.includes('taj mahal') || query.includes('monument')) {
            reply += "The Taj Mahal in Agra was commissioned by Mughal Emperor Shah Jahan between 1632 and 1653 in memory of Mumtaz Mahal. It is globally celebrated as the supreme masterpiece of Mughal marble architecture.";
        } else {
            reply += "From ancient river valley civilizations to modern freedom struggles, every era teaches us resilience, leadership, and culture. Feel free to ask about specific emperors, architectural monuments, wars, or timelines!";
        }
        return { response: reply, text: reply, answer: reply };
    }

    return [];
}

const api = {
    // GET request with automatic smart cloud fallback
    async get(endpoint) {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000); // 4-second timeout for fast fallback
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: headers,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return await this.handleResponse(response, endpoint);
        } catch (error) {
            console.warn(`[Glory of the Past] Live backend unreachable for ${endpoint}. Activating Smart Cloud Fallback.`);
            return resolveFallback(endpoint, 'GET');
        }
    },

    // POST request with fallback
    async post(endpoint, data) {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return await this.handleResponse(response, endpoint);
        } catch (error) {
            console.warn(`[Glory of the Past] POST error on ${endpoint}. Using Smart Fallback handler.`);
            return resolveFallback(endpoint, 'POST', data);
        }
    },

    // PUT request
    async put(endpoint, data) {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            });
            return await this.handleResponse(response, endpoint);
        } catch (error) {
            return { success: true };
        }
    },

    // DELETE request
    async delete(endpoint) {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: headers
            });
            return await this.handleResponse(response, endpoint);
        } catch (error) {
            return { success: true };
        }
    },

    // Handle responses safely
    async handleResponse(response, endpoint = '') {
        if (response.status === 204) {
            return { success: true };
        }

        if (!response.ok) {
            console.warn(`[Glory of the Past] HTTP ${response.status} on ${endpoint}. Falling back to cached data.`);
            return resolveFallback(endpoint);
        }

        const data = await response.json().catch(() => null);
        return data || resolveFallback(endpoint);
    }
};

