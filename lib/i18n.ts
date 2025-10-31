"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      common: {
        cancel: "Cancel",
        saving: "Saving...",
      },
      search: {
        placeholder: "Search by name, location...",
        filter: "Filter",
        clear_all: "Clear all",
        filters: "Filters",
        age: "Age",
        age_from: "From",
        age_to: "To",
        location: "Location",
        city: "City",
        country: "Country",
        body_type: "Body Type",
        hair_color: "Hair Color",
        breast_size: "Breast Size",
        clear: "Clear",
        no_results: "No escorts available"
      },
      ui: { follow: "Follow", message: "Message", view_profile: "View Profile" },
      rightPanel: { search_placeholder: "Search by name, location…" },
      form: {
        email: "Email",
        password: "Password",
        confirm_password: "Confirm Password",
        username: "Username",
      },
      nav: {
        home: "Home",
        explore: "Explore",
        messages: "Messages",
        favorites: "Favorites",
        profile: "My Profile",
        settings: "Settings",
        premium: "Go Premium"
      },
      auth: {
        login: "Login",
        register: "Register",
        logout: "Logout",
        forgot_password: "Forgot password?",
        logging_in: "Logging in...",
        registering: "Registering...",
        login_failed: "Login failed",
        registration_failed: "Registration failed",
        sign_in_to_continue: "Sign in to continue",
        login_or_register: "Login or register to access all features"
      },
      errors: { generic: "An error occurred. Please try again." },
      settings: {
        title: "Settings",
        tabs: { general: "General", security: "Security", look: "Look" },
        general: { 
          profile_discoverable: "Profile discoverable", 
          profile_discoverable_info: "Make your profile visible to other users in search and discovery",
          escort_enable: "Enable escort profile?", 
          escort_enable_info: "Activate your escort profile to offer services and be found by clients",
          escort_disable: "Disable escort profile",
          escort_disable_info: "Deactivate your escort profile and hide it from public view", 
          grid_view: "Grid view",
          grid_view_info: "Display escorts in a 4-column grid layout instead of single card view",
          save: "Save General" 
        },
        security: {
          account: "Account",
          email: "Email",
          username: "Username",
          save_profile: "Save Profile",
          change_password: "Change Password",
          current_password: "Current password",
          new_password: "New password",
          confirm_new_password: "Confirm new password",
          twofa: "Two-Factor Authentication",
          enable_2fa: "Enable 2FA"
        },
        look: {
          appearance: "Appearance",
          dark_mode: "Dark Mode",
          save: "Save Appearance"
        },
        saved: {
          general: "General settings saved.",
          appearance: "Appearance saved.",
          profile: "Profile updated.",
          password: "Password changed.",
          twofa: "Two-factor authentication updated."
        }
      },
      footer: { rights: "© 2025 TheGND. All rights reserved.", language: "Language" },
      profile: {
        tabs: {
          general: "General",
          description: "Description",
          gallery: "Gallery",
          services: "Services & Prices",
          contact: "Contact",
          location: "Location"
        },
        fields: {
          bio: "Bio",
          description: "Description",
          gallery_urls: "Image URLs (one per line)",
          services_text: "Services & prices (one per line: Service - Price)",
          contact_email: "Contact Email",
          contact_phone: "Contact Phone",
          website: "Website",
          address: "Address",
          city: "City",
          country: "Country",
          slogan: "Slogan",
          age: "Age",
          nationality: "Nationality",
          languages: "Languages",
          appearance: "Appearance",
          height: "Height",
          weight: "Weight",
          body_type: "Body type",
          hair_color: "Hair color",
          hair_length: "Hair length",
          breast_type: "Breast type",
          breast_size: "Breast size",
          intimate_area: "Intimate area",
          piercings: "Piercings",
          tattoos: "Tattoos",
          clothing_style: "Clothing style",
          clothing_size: "Clothing size",
          shoe_size: "Shoe size",
          save: "Save",
          saved: "Profile saved."
        },
        upload: {
          title: "Upload",
          rejected: "Some files were rejected. Images up to 10MB, videos up to 200MB.",
          drag_or_select: "Drag files here or choose",
          media_limit: "Images up to 10MB and videos up to 200MB",
          images_limit: "Images up to 10MB",
          choose_files: "Choose files",
          clear_selection: "Clear selection",
          upload: "Upload",
          uploading: "Uploading…",
          set_as_avatar: "Set as avatar",
          avatar_badge: "Avatar"
        }
      }
    }
  },
  de: { translation: {
    common: { cancel: "Abbrechen", saving: "Speichern..." },
    search: {
      placeholder: "Suche nach Name, Ort...",
      filter: "Filter",
      clear_all: "Alle löschen",
      filters: "Filter",
      age: "Alter",
      age_from: "Von",
      age_to: "Bis",
      location: "Standort",
      city: "Stadt",
      country: "Land",
      body_type: "Körperbau",
      hair_color: "Haarfarbe",
      breast_size: "Brustgröße",
      clear: "Löschen",
      no_results: "Keine Escorts verfügbar"
    },
    form: { email: "E-Mail", password: "Passwort", confirm_password: "Passwort bestätigen", username: "Benutzername" },
    nav: { home: "Startseite", explore: "Entdecken", messages: "Nachrichten", favorites: "Favoriten", profile: "Mein Profil", settings: "Einstellungen", premium: "Premium werden" },
    ui: { follow: "Folgen", message: "Nachricht", view_profile: "Profil ansehen" },
    rightPanel: { search_placeholder: "Suche nach Name, Ort…" },
    auth: { login: "Anmelden", register: "Registrieren", logout: "Abmelden", forgot_password: "Passwort vergessen?", logging_in: "Anmeldung...", registering: "Registrierung...", login_failed: "Anmeldung fehlgeschlagen", registration_failed: "Registrierung fehlgeschlagen", sign_in_to_continue: "Melde dich an, um fortzufahren", login_or_register: "Anmelden oder registrieren, um alle Funktionen zu nutzen" },
    errors: { generic: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut." },
    settings: {
      title: "Einstellungen",
      tabs: { general: "Allgemein", security: "Sicherheit", look: "Aussehen" },
      general: { 
        profile_discoverable: "Profil auffindbar", 
        profile_discoverable_info: "Mache dein Profil für andere Nutzer in der Suche und Entdeckung sichtbar",
        escort_enable: "Escort-Profil aktivieren?", 
        escort_enable_info: "Aktiviere dein Escort-Profil, um Dienstleistungen anzubieten und von Kunden gefunden zu werden",
        escort_disable: "Escort-Profil deaktivieren",
        escort_disable_info: "Deaktiviere dein Escort-Profil und verberge es vor der Öffentlichkeit",
        grid_view: "Rasteransicht",
        grid_view_info: "Zeige Escorts in einem 4-Spalten-Raster statt in Einzelkarten-Ansicht",
        save: "Allgemein speichern" 
      },
      security: { account: "Konto", email: "E-Mail", username: "Benutzername", save_profile: "Profil speichern", change_password: "Passwort ändern", current_password: "Aktuelles Passwort", new_password: "Neues Passwort", confirm_new_password: "Neues Passwort bestätigen", twofa: "Zwei-Faktor-Authentifizierung", enable_2fa: "2FA aktivieren" },
      look: { appearance: "Erscheinungsbild", dark_mode: "Dunkelmodus", save: "Aussehen speichern" },
      saved: { general: "Allgemeine Einstellungen gespeichert.", appearance: "Aussehen gespeichert.", profile: "Profil aktualisiert.", password: "Passwort geändert.", twofa: "Zwei-Faktor-Authentifizierung aktualisiert." }
    },
    footer: { rights: "© 2025 TheGND. Alle Rechte vorbehalten.", language: "Sprache" },
    profile: {
      tabs: {
        general: "Allgemein",
        description: "Beschreibung",
        gallery: "Galerie",
        services: "Services & Preise",
        contact: "Kontakt",
        location: "Standort"
      },
      fields: {
        bio: "Bio",
        description: "Beschreibung",
        gallery_urls: "Bild-URLs (eine pro Zeile)",
        services_text: "Leistungen & Preise (eine pro Zeile: Leistung - Preis)",
        contact_email: "Kontakt E-Mail",
        contact_phone: "Kontakt Telefon",
        website: "Webseite",
        address: "Adresse",
        city: "Stadt",
        country: "Land",
        slogan: "Slogan",
        age: "Alter",
        nationality: "Nationalität",
        languages: "Sprache",
        appearance: "Optik",
        height: "Größe",
        weight: "Gewicht",
        body_type: "Körperbau",
        hair_color: "Haarfarbe",
        hair_length: "Haarlänge",
        breast_type: "Brusttyp",
        breast_size: "Brustgröße",
        intimate_area: "Intimbereich",
        piercings: "Piercings",
        tattoos: "Tätowierungen",
        clothing_style: "Kleidungsstil",
        clothing_size: "Kleidergröße",
        shoe_size: "Schuhgröße",
        save: "Speichern",
        saved: "Profil gespeichert."
      },
      upload: {
        title: "Upload",
        rejected: "Einige Dateien wurden abgelehnt. Bilder bis 10MB, Videos bis 200MB.",
        drag_or_select: "Dateien hierher ziehen oder wählen",
        media_limit: "Bilder bis 10MB und Videos bis 200MB",
        images_limit: "Bilder bis 10MB",
        choose_files: "Dateien auswählen",
        clear_selection: "Auswahl leeren",
        upload: "Hochladen",
        uploading: "Wird hochgeladen…",
        set_as_avatar: "Als Avatar festlegen",
        avatar_badge: "Avatar"
      }
    }
  }},
  es: { translation: {
    search: {
      placeholder: "Buscar por nombre, ubicación...",
      filter: "Filtro",
      clear_all: "Borrar todo",
      filters: "Filtros",
      age: "Edad",
      age_from: "Desde",
      age_to: "Hasta",
      location: "Ubicación",
      city: "Ciudad",
      country: "País",
      body_type: "Tipo de cuerpo",
      hair_color: "Color de cabello",
      breast_size: "Tamaño de pecho",
      clear: "Borrar",
      no_results: "No hay escorts disponibles"
    },
    nav: { home: "Inicio", explore: "Explorar", messages: "Mensajes", favorites: "Favoritos", profile: "Mi perfil", settings: "Ajustes", premium: "Hazte Premium" },
    auth: { login: "Iniciar sesión", register: "Registrarse", logout: "Cerrar sesión", sign_in_to_continue: "Inicia sesión para continuar", login_or_register: "Inicia sesión o regístrate para acceder a todas las funciones" },
    settings: { title: "Ajustes", tabs: { general: "General", security: "Seguridad", look: "Apariencia" }, general: { profile_discoverable: "Perfil visible", escort_enable: "¿Activar perfil de escort?", escort_disable: "Desactivar perfil de escort", save: "Guardar general" }, security: { account: "Cuenta", email: "Correo", username: "Usuario", save_profile: "Guardar perfil", change_password: "Cambiar contraseña", current_password: "Contraseña actual", new_password: "Nueva contraseña", confirm_new_password: "Confirmar nueva contraseña", twofa: "Autenticación en dos pasos", enable_2fa: "Activar 2FA" }, look: { appearance: "Apariencia", dark_mode: "Modo oscuro", save: "Guardar apariencia" }, saved: { general: "Configuración general guardada.", appearance: "Aparencia guardada.", profile: "Perfil actualizado.", password: "Contraseña cambiada.", twofa: "2FA actualizado." } },
    footer: { rights: "© 2025 TheGND. Todos los derechos reservados.", language: "Idioma" },
    profile: {
      tabs: { general: "General", description: "Descripción", gallery: "Galería", services: "Servicios y Precios", contact: "Contacto", location: "Ubicación" },
      fields: {
        bio: "Bio",
        description: "Descripción",
        gallery_urls: "URLs de imagen (una por línea)",
        services_text: "Servicios y precios (una por línea: Servicio - Precio)",
        contact_email: "Correo de contacto",
        contact_phone: "Teléfono de contacto",
        website: "Sitio web",
        address: "Dirección",
        city: "Ciudad",
        country: "País",
        slogan: "Eslogan",
        age: "Edad",
        nationality: "Nacionalidad",
        languages: "Idiomas",
        appearance: "Apariencia",
        height: "Altura",
        weight: "Peso",
        body_type: "Tipo de cuerpo",
        hair_color: "Color de pelo",
        hair_length: "Largo del pelo",
        breast_type: "Tipo de pecho",
        breast_size: "Talla de pecho",
        intimate_area: "Zona íntima",
        piercings: "Piercings",
        tattoos: "Tatuajes",
        clothing_style: "Estilo de ropa",
        clothing_size: "Talla de ropa",
        shoe_size: "Talla de zapato",
        save: "Guardar",
        saved: "Perfil guardado."
      },
      upload: {
        title: "Subir",
        rejected: "Algunos archivos fueron rechazados. Imágenes hasta 10MB, videos hasta 200MB.",
        drag_or_select: "Arrastra archivos aquí o elige",
        media_limit: "Imágenes hasta 10MB y videos hasta 200MB",
        images_limit: "Imágenes hasta 10MB",
        choose_files: "Elegir archivos",
        clear_selection: "Vaciar selección",
        upload: "Subir",
        uploading: "Subiendo…",
        set_as_avatar: "Establecer como avatar",
        avatar_badge: "Avatar"
      }
    }
  }},
  fr: { translation: {
    search: {
      placeholder: "Rechercher par nom, lieu...",
      filter: "Filtre",
      clear_all: "Tout effacer",
      filters: "Filtres",
      age: "Âge",
      age_from: "De",
      age_to: "À",
      location: "Localisation",
      city: "Ville",
      country: "Pays",
      body_type: "Type de corps",
      hair_color: "Couleur des cheveux",
      breast_size: "Taille de poitrine",
      clear: "Effacer",
      no_results: "Aucune escort disponible"
    },
    nav: { home: "Accueil", explore: "Explorer", messages: "Messages", favorites: "Favoris", profile: "Mon profil", settings: "Paramètres", premium: "Passer Premium" },
    auth: { login: "Connexion", register: "Inscription", logout: "Déconnexion", sign_in_to_continue: "Connectez-vous pour continuer", login_or_register: "Connectez-vous ou inscrivez-vous pour accéder à toutes les fonctionnalités" },
    settings: { title: "Paramètres", tabs: { general: "Général", security: "Sécurité", look: "Apparence" }, general: { profile_discoverable: "Profil visible", escort_enable: "Activer le profil escort ?", escort_disable: "Désactiver le profil escort", save: "Enregistrer général" }, security: { account: "Compte", email: "E-mail", username: "Nom d'utilisateur", save_profile: "Enregistrer le profil", change_password: "Changer le mot de passe", current_password: "Mot de passe actuel", new_password: "Nouveau mot de passe", confirm_new_password: "Confirmer le nouveau mot de passe", twofa: "Authentification à deux facteurs", enable_2fa: "Activer 2FA" }, look: { appearance: "Apparence", dark_mode: "Mode sombre", save: "Enregistrer l'apparence" }, saved: { general: "Paramètres généraux enregistrés.", appearance: "Apparence enregistrée.", profile: "Profil mis à jour.", password: "Mot de passe changé.", twofa: "2FA mis à jour." } },
    footer: { rights: "© 2025 TheGND. Tous droits réservés.", language: "Langue" },
    profile: {
      tabs: { general: "Général", description: "Description", gallery: "Galerie", services: "Services et Prix", contact: "Contact", location: "Localisation" },
      fields: {
        bio: "Bio",
        description: "Description",
        gallery_urls: "URLs d'image (une par ligne)",
        services_text: "Services et prix (une par ligne : Service - Prix)",
        contact_email: "E-mail de contact",
        contact_phone: "Téléphone de contact",
        website: "Site web",
        address: "Adresse",
        city: "Ville",
        country: "Pays",
        slogan: "Slogan",
        age: "Âge",
        nationality: "Nationalité",
        languages: "Langues",
        appearance: "Apparence",
        height: "Taille",
        weight: "Poids",
        body_type: "Type de corps",
        hair_color: "Couleur des cheveux",
        hair_length: "Longueur des cheveux",
        breast_type: "Type de poitrine",
        breast_size: "Taille de poitrine",
        intimate_area: "Zone intime",
        piercings: "Piercings",
        tattoos: "Tattoos",
        clothing_style: "Style vestimentaire",
        clothing_size: "Taille de vêtement",
        shoe_size: "Pointure",
        save: "Enregistrer",
        saved: "Profil enregistré."
      },
      upload: {
        title: "Téléverser",
        rejected: "Certains fichiers ont été refusés. Images jusqu'à 10Mo, vidéos jusqu'à 200Mo.",
        drag_or_select: "Glissez-déposez des fichiers ici ou choisissez",
        media_limit: "Images jusqu'à 10Mo et vidéos jusqu'à 200Mo",
        images_limit: "Images jusqu'à 10Mo",
        choose_files: "Choisir des fichiers",
        clear_selection: "Vider la sélection",
        upload: "Téléverser",
        uploading: "Téléversement…",
        set_as_avatar: "Définir comme avatar"
      }
    }
  }},
  it: { translation: { 
    search: { placeholder: "Cerca per nome, luogo...", filter: "Filtro", clear_all: "Cancella tutto", filters: "Filtri", age: "Età", age_from: "Da", age_to: "A", location: "Posizione", city: "Città", country: "Paese", body_type: "Tipo di corpo", hair_color: "Colore dei capelli", breast_size: "Taglia del seno", clear: "Cancella", no_results: "Nessuna escort disponibile" },
    nav: { home: "Home", explore: "Esplora", messages: "Messaggi", favorites: "Preferiti", profile: "Il mio profilo", settings: "Impostazioni", premium: "Passa a Premium" }, auth: { login: "Accedi", register: "Registrati", logout: "Esci", sign_in_to_continue: "Accedi per continuare", login_or_register: "Accedi o registrati per utilizzare tutte le funzioni" }, settings: { title: "Impostazioni", tabs: { general: "Generali", security: "Sicurezza", look: "Aspetto" }, general: { profile_discoverable: "Profilo visibile", escort_enable: "Abilitare il profilo escort?", escort_disable: "Disabilitare il profilo escort", save: "Salva generali" }, security: { account: "Account", email: "Email", username: "Nome utente", save_profile: "Salva profilo", change_password: "Cambia password", current_password: "Password attuale", new_password: "Nuova password", confirm_new_password: "Conferma nuova password", twofa: "Autenticazione a due fattori", enable_2fa: "Abilita 2FA" }, look: { appearance: "Aspetto", dark_mode: "Tema scuro", save: "Salva aspetto" }, saved: { general: "Impostazioni generali salvate.", appearance: "Aspetto salvato.", profile: "Profilo aggiornato.", password: "Password cambiata.", twofa: "2FA aggiornato." } }, footer: { rights: "© 2025 TheGND. Tutti i diritti riservati.", language: "Lingua" }, profile: { tabs: { general: "Generale", description: "Descrizione", gallery: "Galleria", services: "Servizi e Prezzi", contact: "Contatto", location: "Posizione" }, fields: { bio: "Bio", description: "Descrizione", gallery_urls: "URL immagini (una per riga)", services_text: "Servizi e prezzi (una per riga: Servizio - Prezzo)", contact_email: "Email di contatto", contact_phone: "Telefono di contatto", website: "Sito web", address: "Indirizzo", city: "Città", country: "Paese", slogan: "Slogan", age: "Età", nationality: "Nazionalità", languages: "Lingue", appearance: "Aspetto", height: "Altezza", weight: "Peso", body_type: "Tipo di corpo", hair_color: "Colore dei capelli", hair_length: "Lunghezza dei capelli", breast_type: "Tipo di seno", breast_size: "Taglia seno", intimate_area: "Zona intima", piercings: "Piercing", tattoos: "Tatuaggi", clothing_style: "Stile di abbigliamento", clothing_size: "Taglia di abbigliamento", shoe_size: "Numero di scarpe", save: "Salva", saved: "Profilo salvato." } } } },
  pl: { translation: { 
    search: { placeholder: "Szukaj po nazwie, lokalizacji...", filter: "Filtr", clear_all: "Wyczyść wszystko", filters: "Filtry", age: "Wiek", age_from: "Od", age_to: "Do", location: "Lokalizacja", city: "Miasto", country: "Kraj", body_type: "Typ ciała", hair_color: "Kolor włosów", breast_size: "Rozmiar piersi", clear: "Wyczyść", no_results: "Brak dostępnych escort" },
    nav: { home: "Strona główna", explore: "Odkrywaj", messages: "Wiadomości", favorites: "Ulubione", profile: "Mój profil", settings: "Ustawienia", premium: "Przejdź na Premium" }, auth: { login: "Zaloguj", register: "Zarejestruj", logout: "Wyloguj", sign_in_to_continue: "Zaloguj się, aby kontynuować", login_or_register: "Zaloguj się lub zarejestruj, aby uzyskać dostęp do wszystkich funkcji" }, settings: { title: "Ustawienia", tabs: { general: "Ogólne", security: "Bezpieczeństwo", look: "Wygląd" }, general: { profile_discoverable: "Profil widoczny", escort_enable: "Włączyć profil escort?", escort_disable: "Wyłączyć profil escort", save: "Zapisz ogólne" }, security: { account: "Konto", email: "Email", username: "Nazwa użytkownika", save_profile: "Zapisz profil", change_password: "Zmień hasło", current_password: "Obecne hasło", new_password: "Nowe hasło", confirm_new_password: "Potwierdź nowe hasło", twofa: "Uwierzytelnianie dwuskładnikowe", enable_2fa: "Włącz 2FA" }, look: { appearance: "Wygląd", dark_mode: "Tryb ciemny", save: "Zapisz wygląd" }, saved: { general: "Zapisano ustawienia ogólne.", appearance: "Zapisano wygląd.", profile: "Zaktualizowano profil.", password: "Zmieniono hasło.", twofa: "Zaktualizowano 2FA." } }, footer: { rights: "© 2025 TheGND. Wszelkie prawa zastrzeżone.", language: "Język" }, profile: { tabs: { general: "Ogólne", description: "Opis", gallery: "Galeria", services: "Usługi i Ceny", contact: "Kontakt", location: "Lokalizacja" }, fields: { bio: "Bio", description: "Opis", gallery_urls: "Adresy obrazów (po jednej w linii)", services_text: "Usługi i ceny (po jednej w linii: Usługa - Cena)", contact_email: "E-mail kontaktowy", contact_phone: "Telefon kontaktowy", website: "Strona www", address: "Adres", city: "Miasto", country: "Kraj", slogan: "Slogan", age: "Wiek", nationality: "Narodowość", languages: "Języki", appearance: "Wygląd", height: "Wzrost", weight: "Waga", body_type: "Typ sylwetki", hair_color: "Kolor włosów", hair_length: "Długość włosów", breast_type: "Typ biustu", breast_size: "Rozmiar biustu", intimate_area: "Strefa intymna", piercings: "Kolczyki", tattoos: "Tatuaże", clothing_style: "Styl ubioru", clothing_size: "Rozmiar ubrania", shoe_size: "Rozmiar buta", save: "Zapisz", saved: "Zapisano profil." } } } },
  cs: { translation: { 
    search: { placeholder: "Hledat podle jména, místa...", filter: "Filtr", clear_all: "Vymazat vše", filters: "Filtry", age: "Věk", age_from: "Od", age_to: "Do", location: "Umístění", city: "Město", country: "Země", body_type: "Typ postavy", hair_color: "Barva vlasů", breast_size: "Velikost prsou", clear: "Vymazat", no_results: "Žádné escort k dispozici" },
    nav: { home: "Domů", explore: "Prozkoumat", messages: "Zprávy", favorites: "Oblíbené", profile: "Můj profil", settings: "Nastavení", premium: "Získat Premium" }, auth: { login: "Přihlásit", register: "Registrovat", logout: "Odhlásit", sign_in_to_continue: "Pro pokračování se přihlaste", login_or_register: "Přihlaste se nebo se zaregistrujte pro přístup ke všem funkcím" }, settings: { title: "Nastavení", tabs: { general: "Obecné", security: "Zabezpečení", look: "Vzhled" }, general: { profile_discoverable: "Profil dohledatelný", escort_enable: "Povolit escort profil?", escort_disable: "Zakázat escort profil", save: "Uložit obecné" }, security: { account: "Účet", email: "E-mail", username: "Uživatelské jméno", save_profile: "Uložit profil", change_password: "Změnit heslo", current_password: "Současné heslo", new_password: "Nové heslo", confirm_new_password: "Potvrďte nové heslo", twofa: "Dvoufázové ověření", enable_2fa: "Povolit 2FA" }, look: { appearance: "Vzhled", dark_mode: "Tmavý režim", save: "Uložit vzhled" }, saved: { general: "Obecná nastavení uložena.", appearance: "Vzhled uložen.", profile: "Profil aktualizován.", password: "Heslo změněno.", twofa: "2FA aktualizováno." } }, footer: { rights: "© 2025 TheGND. Všechna práva vyhrazena.", language: "Jazyk" }, profile: { tabs: { general: "Obecné", description: "Popis", gallery: "Galerie", services: "Služby a Ceny", contact: "Kontakt", location: "Umístění" }, fields: { bio: "Bio", description: "Popis", gallery_urls: "Adresy obrázků (jedna na řádek)", services_text: "Služby a ceny (jedna na řádek: Služba - Cena)", contact_email: "Kontaktní e-mail", contact_phone: "Kontaktní telefon", website: "Web", address: "Adresa", city: "Město", country: "Země", slogan: "Slogan", age: "Věk", nationality: "Národnost", languages: "Jazyky", appearance: "Vzhled", height: "Výška", weight: "Hmotnost", body_type: "Typ postavy", hair_color: "Barva vlasů", hair_length: "Délka vlasů", breast_type: "Typ poprsí", breast_size: "Velikost poprsí", intimate_area: "Intimní oblast", piercings: "Piercingy", tattoos: "Tetování", clothing_style: "Styl oblečení", clothing_size: "Velikost oblečení", shoe_size: "Velikost bot", save: "Uložit", saved: "Profil uložen." } } } },
  hu: { translation: { 
    search: { placeholder: "Keresés név, hely szerint...", filter: "Szűrő", clear_all: "Összes törlése", filters: "Szűrők", age: "Kor", age_from: "Tól", age_to: "Ig", location: "Helyszín", city: "Város", country: "Ország", body_type: "Testalkat", hair_color: "Hajszín", breast_size: "Mellméret", clear: "Törlés", no_results: "Nincs elérhető escort" },
    nav: { home: "Kezdőlap", explore: "Felfedezés", messages: "Üzenetek", favorites: "Kedvencek", profile: "Profilom", settings: "Beállítások", premium: "Prémiumra váltás" }, auth: { login: "Bejelentkezés", register: "Regisztráció", logout: "Kijelentkezés", sign_in_to_continue: "Jelentkezz be a folytatáshoz", login_or_register: "Jelentkezz be vagy regisztrálj a teljes hozzáféréshez" }, settings: { title: "Beállítások", tabs: { general: "Általános", security: "Biztonság", look: "Megjelenés" }, general: { profile_discoverable: "Profil kereshető", escort_enable: "Escort profil engedélyezése?", escort_disable: "Escort profil letiltása", save: "Általános mentése" }, security: { account: "Fiók", email: "E-mail", username: "Felhasználónév", save_profile: "Profil mentése", change_password: "Jelszó megváltoztatása", current_password: "Jelenlegi jelszó", new_password: "Új jelszó", confirm_new_password: "Új jelszó megerősítése", twofa: "Kétlépcsős hitelesítés", enable_2fa: "2FA engedélyezése" }, look: { appearance: "Megjelenés", dark_mode: "Sötét mód", save: "Megjelenés mentése" }, saved: { general: "Általános beállítások mentve.", appearance: "Megjelenés mentve.", profile: "Profil frissítve.", password: "Jelszó megváltoztatva.", twofa: "2FA frissítve." } }, footer: { rights: "© 2025 TheGND. Minden jog fenntartva.", language: "Nyelv" }, profile: { tabs: { general: "Általános", description: "Leírás", gallery: "Galéria", services: "Szolgáltatások és Árak", contact: "Kapcsolat", location: "Helyszín" }, fields: { bio: "Bio", description: "Leírás", gallery_urls: "Képek URL-jei (soronként egy)", services_text: "Szolgáltatások és árak (soronként: Szolgáltatás - Ár)", contact_email: "Kapcsolati e-mail", contact_phone: "Kapcsolati telefon", website: "Weboldal", address: "Cím", city: "Város", country: "Ország", slogan: "Szlogen", age: "Életkor", nationality: "Állampolgárság", languages: "Nyelvek", appearance: "Megjelenés", height: "Magasság", weight: "Súly", body_type: "Testalkat", hair_color: "Hajszín", hair_length: "Hosszú haj", breast_type: "Mell típusa", breast_size: "Mellméret", intimate_area: "Intim terület", piercings: "Piercingek", tattoos: "Tetoválások", clothing_style: "Öltözködési stílus", clothing_size: "Ruha méret", shoe_size: "Cipőméret", save: "Mentés", saved: "Profil mentve." } } } },
  ro: { translation: { 
    search: { placeholder: "Caută după nume, locație...", filter: "Filtru", clear_all: "Șterge tot", filters: "Filtre", age: "Vârstă", age_from: "De la", age_to: "Până la", location: "Locație", city: "Oraș", country: "Țară", body_type: "Tip corp", hair_color: "Culoare păr", breast_size: "Mărime sân", clear: "Șterge", no_results: "Nicio escortă disponibilă" },
    nav: { home: "Acasă", explore: "Descoperă", messages: "Mesaje", favorites: "Favorite", profile: "Profilul meu", settings: "Setări", premium: "Devino Premium" }, auth: { login: "Autentificare", register: "Înregistrare", logout: "Deconectare", sign_in_to_continue: "Autentifică-te pentru a continua", login_or_register: "Autentifică-te sau înscrie-te pentru a accesa toate funcțiile" }, settings: { title: "Setări", tabs: { general: "General", security: "Securitate", look: "Aspect" }, general: { profile_discoverable: "Profil vizibil", escort_enable: "Activezi profilul de escortă?", escort_disable: "Dezactivează profilul de escortă", save: "Salvează generale" }, security: { account: "Cont", email: "Email", username: "Nume utilizator", save_profile: "Salvează profilul", change_password: "Schimbă parola", current_password: "Parola actuală", new_password: "Parola nouă", confirm_new_password: "Confirmă parola nouă", twofa: "Autentificare cu doi factori", enable_2fa: "Activează 2FA" }, look: { appearance: "Aspect", dark_mode: "Mod întunecat", save: "Salvează aspectul" }, saved: { general: "Setări generale salvate.", appearance: "Aspect salvat.", profile: "Profil actualizat.", password: "Parola a fost schimbată.", twofa: "2FA actualizat." } }, footer: { rights: "© 2025 TheGND. Toate drepturile rezervate.", language: "Limbă" }, profile: { tabs: { general: "General", description: "Descriere", gallery: "Galerie", services: "Servicii și Prețuri", contact: "Contact", location: "Locație" }, fields: { bio: "Bio", description: "Descriere", gallery_urls: "URL-uri imagine (una pe linie)", services_text: "Servicii și prețuri (una pe linie: Serviciu - Preț)", contact_email: "Email de contact", contact_phone: "Telefon de contact", website: "Website", address: "Adresă", city: "Oraș", country: "Țară", slogan: "Slogan", age: "Vârstă", nationality: "Naționalitate", languages: "Limbi", appearance: "Aspect", height: "Înălțime", weight: "Greutate", body_type: "Tipul corpului", hair_color: "Culoarea părului", hair_length: "Lungimea părului", breast_type: "Tipul sânilor", breast_size: "Mărimea sânilor", intimate_area: "Zonă intimă", piercings: "Piercinguri", tattoos: "Tatuaje", clothing_style: "Stil vestimentar", clothing_size: "Mărime îmbrăcăminte", shoe_size: "Mărime încălțăminte", save: "Salvează", saved: "Profil salvat." } } } }
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: ["en", "de", "es", "fr", "it", "pl", "cs", "hu", "ro"],
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
        lookupLocalStorage: "lang",
      },
      interpolation: { escapeValue: false },
      returnEmptyString: false,
    });
} else {
  try {
    const entries = resources as any;
    Object.keys(entries).forEach((lng) => {
      const bundle = entries[lng]?.translation || {};
      if (bundle && Object.keys(bundle).length) {
        i18n.addResourceBundle(lng, "translation", bundle, true, true);
      }
    });
  } catch {}
}

export default i18n;
