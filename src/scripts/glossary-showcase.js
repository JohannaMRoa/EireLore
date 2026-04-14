document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const letterBtns = Array.from(document.querySelectorAll('.letter-btn'));
  const letterGroups = Array.from(document.querySelectorAll('.letter-group'));
  const clearFilterBtn = document.getElementById('clear-filter');
  const resultsCount = document.getElementById('results-count');
  const noResults = document.getElementById('no-results');

  let currentLetter = 'ALL';
  let searchTerm = '';

  function filterGlossary() {
    let visibleCount = 0;

    letterGroups.forEach(group => {
      const groupLetter = group.dataset.letter;
      let groupHasVisibleItems = false;
      const itemsInGroup = Array.from(group.querySelectorAll('.term-item'));

      itemsInGroup.forEach(item => {
        const termName = item.querySelector('h3')?.textContent?.toLowerCase() || '';
        const termMeaning = item.querySelector('p:not(.font-mono)')?.textContent?.toLowerCase() || '';
        
        const matchesSearch = termName.includes(searchTerm) || termMeaning.includes(searchTerm);
        const matchesLetter = currentLetter === 'ALL' || groupLetter === currentLetter;

        if (matchesSearch && matchesLetter) {
          // Usamos flex en móviles y grid en desktop según las clases de Tailwind
          item.style.display = window.innerWidth >= 768 ? 'grid' : 'block'; 
          groupHasVisibleItems = true;
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      group.style.display = groupHasVisibleItems ? 'block' : 'none';
    });

    if (resultsCount) resultsCount.textContent = visibleCount.toString();
    
    if (visibleCount === 0 && noResults) {
      noResults.classList.remove('hidden');
    } else if (noResults) {
      noResults.classList.add('hidden');
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase();
      filterGlossary();
    });
  }

  letterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.currentTarget;
      
      letterBtns.forEach(b => {
        b.classList.remove('bg-gold/20', 'text-sand', 'font-semibold');
        b.classList.add('bg-dark/40', 'text-sand/60', 'border-transparent');
      });
      
      targetBtn.classList.remove('bg-dark/40', 'text-sand/60', 'border-transparent');
      targetBtn.classList.add('bg-gold/20', 'text-sand', 'font-semibold');

      currentLetter = targetBtn.dataset.letter || 'ALL';
      
      if (currentLetter !== 'ALL' && clearFilterBtn) {
        clearFilterBtn.classList.remove('hidden');
      } else if (clearFilterBtn) {
        clearFilterBtn.classList.add('hidden');
      }

      filterGlossary();
    });
  });

  if (clearFilterBtn) {
    clearFilterBtn.addEventListener('click', () => {
      const allBtn = document.querySelector('[data-letter="ALL"]');
      if (allBtn) allBtn.click();
    });
  }
  
  // Re-ajustar display en resize para mantener el layout responsivo
  window.addEventListener('resize', filterGlossary);
});