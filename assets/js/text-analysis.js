document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const basicStats = document.getElementById('basicStats');
    const pronounsCount = document.getElementById('pronounsCount');
    const prepositionsCount = document.getElementById('prepositionsCount');
    const articlesCount = document.getElementById('articlesCount');

    // Word groups
    const pronouns = {
        personal: ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'],
        possessive: ['my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs'],
        reflexive: ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves'],
        demonstrative: ['this', 'that', 'these', 'those'],
        relative: ['who', 'whom', 'whose', 'which', 'that']
    };

    const prepositions = {
        location: ['in', 'on', 'at', 'by', 'near', 'between', 'among', 'throughout', 'behind', 'under', 'over', 'above'],
        time: ['before', 'after', 'during', 'until', 'since', 'for', 'while'],
        direction: ['to', 'from', 'into', 'onto', 'across', 'through', 'toward', 'towards'],
        other: ['of', 'with', 'without', 'about', 'like', 'except', 'despite', 'besides']
    };

    const indefiniteArticles = ['a', 'an'];

    // Basic text statistics
    function countBasicStats(text) {
        return {
            letters: (text.match(/[a-zA-Z]/g) || []).length,
            words: (text.trim().match(/\b\w+\b/g) || []).length,
            spaces: (text.match(/ /g) || []).length,
            newlines: (text.match(/\n/g) || []).length,
            specialSymbols: (text.match(/[^a-zA-Z0-9\s]/g) || []).length
        };
    }

    // Grouped word count (avoiding double counts)
    function countWordsByCategory(text, categories) {
        const cleanedText = text.toLowerCase().replace(/\s+/g, ' ').trim();
        const words = cleanedText.match(/\b\w+\b/g) || [];
        const counts = {};

        for (const category of Object.keys(categories)) {
            counts[category] = {};
        }

        for (const word of words) {
            for (const [category, wordList] of Object.entries(categories)) {
                if (wordList.includes(word)) {
                    if (!counts[category][word]) counts[category][word] = 0;
                    counts[category][word]++;
                    break; // prevents counting "that" twice
                }
            }
        }

        return counts;
    }

    // Display results
    function displayBasicStats(stats) {
        basicStats.innerHTML = Object.entries(stats)
            .map(([key, value]) => `<li><strong>${capitalize(key)}:</strong> ${value}</li>`)
            .join('');
    }

    function displayCategoryCounts(element, counts, title) {
        let html = '';
        for (const [category, wordCounts] of Object.entries(counts)) {
            const entries = Object.entries(wordCounts);
            if (entries.length > 0) {
                const total = entries.reduce((sum, [_, c]) => sum + c, 0);
                html += `<li><strong>${capitalize(category)} (Total: ${total}):</strong><ul>`;
                for (const [word, count] of entries) {
                    html += `<li>"${word}": ${count}</li>`;
                }
                html += '</ul></li>';
            }
        }
        element.innerHTML = html || `<li>No ${title} found</li>`;
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Event handler
    analyzeBtn.addEventListener('click', () => {
        const text = textInput.value;

        if ((text.trim().match(/\b\w+\b/g) || []).length < 10) {
            alert('Please enter at least 10 words for analysis.');
            return;
        }

        const stats = countBasicStats(text);
        displayBasicStats(stats);

        const pronounCounts = countWordsByCategory(text, pronouns);
        displayCategoryCounts(pronounsCount, pronounCounts, 'pronouns');

        const prepositionCounts = countWordsByCategory(text, prepositions);
        displayCategoryCounts(prepositionsCount, prepositionCounts, 'prepositions');

        const articleCounts = countWordsByCategory(text, { indefinite: indefiniteArticles });
        displayCategoryCounts(articlesCount, articleCounts, 'articles');
    });
});
