const encodeFileName = (name) => encodeURIComponent(name).replace(/%2F/g, "/");

const createGallery = (prefix, firstIndex, lastIndex, extension = "jpg") =>
  Array.from({ length: lastIndex - firstIndex + 1 }, (_, idx) => {
    const number = String(firstIndex + idx).padStart(4, "0");
    const filename = `${prefix}${number}.${extension}`;
    return `/img/${filename}`;
  });

export const projectCategories = ["Tous", "Académique", "Personnel", "Infra", "Développement"];

export const projects = [
  {
    id: "ad",
    title: "Active Directory",
    summary:
      "Déploiement d’un domaine AD complet : ADDS, UO, groupes AGDLP, GPO, scripts d’audit et analyse PingCastle/HardeningKitten.",
    description:
      "Déploiement d’un domaine AD complet : installation ADDS, UO, groupes AGDLP, GPO, permissions, scripts d’audit et analyse PingCastle/HardeningKitten.",
    fullDescription:
      "Déploiement d’un domaine AD complet : installation ADDS, UO, groupes AGDLP, GPO, permissions, scripts d’audit et analyse PingCastle/HardeningKitten.",
    tools: ["AD", "GPO", "PowerShell", "PingCastle", "HardeningKitten"],
    category: "Infra",
    gallery: createGallery("Active Directory.pptx_page-", 1, 27),
    thumbnail:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "bash-lib",
    title: "Scripting Bash",
    summary:
      "Scriptothèque Bash (15 jobs) pour automatiser permissions, audits, fichiers et tâches système.",
    description:
      "Création d’une bibliothèque de scripts Bash pour automatiser permissions, audits, gestion de fichiers et tâches système (15 jobs).",
    fullDescription:
      "Création d’une bibliothèque de scripts Bash pour automatiser permissions, audits, gestion de fichiers et tâches système (15 jobs).",
    tools: ["Bash", "Permissions", "Conditions", "Automatisation"],
    category: "Académique",
    gallery: createGallery("Scripting Bash_page-", 1, 26),
    thumbnail:
      "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cyber-archi",
    title: "Architecture Réseau Cisco",
    summary:
      "Architecture multi-sites : VLAN, DMZ, DHCP/DNS, serveur files/backup, VPN IPsec, supervision réseau.",
    description:
      "Architecture multi-sites : VLAN, DMZ, DHCP/DNS, serveur files/backup, VPN IPsec et supervision réseau.",
    fullDescription:
      "Architecture multi-sites : VLAN, DMZ, DHCP/DNS, serveur files/backup, VPN IPsec et supervision réseau.",
    tools: ["Cisco", "VLAN", "DMZ", "VPN", "NetFlow", "ELK"],
    category: "Infra",
    gallery: createGallery("Réseaux & Cisco_page-", 1, 20),
    thumbnail:
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "services-core",
    title: "Services DHCP/DNS/FTP/SSH",
    summary:
      "Installation & sécurisation DHCP, DNS, FTP, SSH/SFTP : tests, restrictions, durcissement Bind9 + proftpd.",
    description:
      "Installation et sécurisation DHCP, DNS, FTP, SSH/SFTP : tests, restrictions, durcissement et configuration Bind9 + proftpd.",
    fullDescription:
      "Installation et sécurisation DHCP, DNS, FTP, SSH/SFTP : tests, restrictions, durcissement et configuration Bind9 + proftpd.",
    tools: ["Debian", "DHCP", "Bind9", "SSH", "FTP/SFTP"],
    category: "Académique",
    gallery: createGallery("DHCP, DNS, FTP et SSH_page-", 1, 24),
    thumbnail:
      "https://images.unsplash.com/photo-1580894897200-6ff1c8f0d1b1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "iam",
    title: "LDAP / IAM",
    summary:
      "Déploiement OpenLDAP : OU, utilisateurs, groupes, ppolicy, phpLDAPadmin, tests ldapsearch.",
    description:
      "Déploiement OpenLDAP : OU, utilisateurs, groupes, politique ppolicy, gestion via phpLDAPadmin et tests ldapsearch.",
    fullDescription:
      "Déploiement OpenLDAP : OU, utilisateurs, groupes, politique ppolicy, gestion via phpLDAPadmin et tests ldapsearch.",
    tools: ["OpenLDAP", "ppolicy", "phpLDAPadmin", "Docker"],
    category: "Personnel",
    gallery: createGallery("LDAP et Gestion des accès (1)_page-", 1, 28),
    thumbnail:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=80"
  }
];

