document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".team-card"));
  const detailPanel = document.getElementById("team-detail");
  const detailImage = document.getElementById("detail-image");
  const detailName = document.getElementById("detail-name");
  const detailRole = document.getElementById("detail-role");
  const detailShort = document.getElementById("detail-short");
  const detailBio = document.getElementById("detail-bio");
  const detailSkills = document.getElementById("detail-skills");
  const detailContact = document.getElementById("detail-contact");

  function updateDetail(member) {
    if (
      !detailPanel ||
      !detailImage ||
      !detailName ||
      !detailRole ||
      !detailShort ||
      !detailBio ||
      !detailSkills ||
      !detailContact
    ) {
      return;
    }

    cards.forEach((card) => card.classList.remove("is-active"));

    const activeCard = cards.find(
      (card) => card.dataset.member === JSON.stringify(member)
    );

    if (activeCard) {
      activeCard.classList.add("is-active");
    }

    detailPanel.classList.remove("team-detail-open");
    detailPanel.classList.add("team-detail-closing");

    setTimeout(() => {
      detailImage.setAttribute("src", member.image);
      detailImage.setAttribute("alt", member.name);
      detailName.textContent = member.name;
      detailRole.textContent = member.role;
      detailShort.textContent = member.short;
      detailBio.textContent = member.bio;

      detailSkills.innerHTML = "";
      member.skills.forEach((skill) => {
        const tag = document.createElement("span");
        tag.className =
          "rounded-full border border-gold/15 bg-forest/25 px-4 py-2 text-sm text-sand/85";
        tag.textContent = skill;
        detailSkills.appendChild(tag);
      });

      detailContact.textContent = member.contact;
      detailContact.setAttribute("href", `mailto:${member.contact}`);

      detailPanel.classList.remove("team-detail-closing");
      detailPanel.classList.add("team-detail-open");
    }, 180);
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const member = JSON.parse(card.dataset.member || "{}");
      updateDetail(member);
    });
  });
});