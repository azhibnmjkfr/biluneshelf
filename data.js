// ========================================
// DATA BUKU BILUNESHELF
// Ganti link dan data di sini saja!
// ========================================

const bookData = [
    {
        id: 1,
        title: "Cambridge Global English 2 LB",
        author: "Cambridge University Press",
        category: "inggris",
        synopsis: "Buku ajar bahasa Inggris untuk pelajar global. Materi disusun interaktif dan kontekstual untuk membangun keterampilan berkomunikasi secara alami dan percaya diri.",
        url: "https://online.fliphtml5.com/xlrnq/fucc"
    },
    {
        id: 2,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "novel",
        synopsis: "Kisah abadi tentang cinta dan prasangka di era Regency. Elizabeth Bennet dan Mr. Darcy saling beradu argumentasi—dan perlahan menyadari bahwa cinta tak selalu tampak di pandangan pertama.",
        url: "https://pubhtml5.com/oobw/gpfn/pride-and-prejudice/"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        category: "novel",
        synopsis: "Dunia di mana kebebasan adalah ilusi dan pikiran adalah kejahatan. Winston Smith mencoba melawan sistem yang mengawasi setiap hela napas—sebuah peringatan abadi tentang kekuasaan dan kebenaran.",
        url: "https://online.fliphtml5.com/vbiia/afwc/"
    },
    {
        id: 4,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        category: "novel",
        synopsis: "Sepuluh anak dari desa miskin di Belitung, bersekolah di SD Muhammadiyah yang nyaris roboh. Dengan semangat dan mimpi, mereka membuktikan bahwa kemiskinan tak pernah bisa membatasi cita-cita.",
        url: "https://online.pubhtml5.com/rwiac/brai/"
    },
    {
        id: 5,
        title: "Atomic Habits (versi Indonesia)",
        author: "James Clear",
        category: "lainnya",
        synopsis: "Perubahan besar berawal dari kebiasaan kecil. Buku ini membongkar rahasia membentuk kebiasaan baik dan melepas kebiasaan buruk—tanpa motivasi besar, cukup dengan sistem yang tepat.",
        url: "https://online.pubhtml5.com/mqswg/ofpy/"
    },
    {
        id: 6,
        title: "The Alchemist (Sang Alkemis)",
        author: "Paulo Coelho",
        category: "novel",
        synopsis: "Santiago, seorang gembala muda, menjual domba-dombanya demi mengejar mimpi yang muncul dalam tidurnya. Perjalanan ke Mesir membawanya menemukan harta karun sejati: keberanian untuk mendengarkan hati.",
        url: "https://online.fliphtml5.com/rqpgn/dfef/"
    },
    {
        id: 7,
        title: "Filosofi Teras",
        author: "Henry Manampiring",
        category: "lainnya",
        synopsis: "Stoikisme untuk anak muda modern. Buku ini mengajak kita mengenali apa yang bisa dan tak bisa kita kendalikan—sebuah seni kuno yang membuat hidup lebih tenang di era yang serba cepat.",
        url: "https://online.pubhtml5.com/nwtbm/jjhw/"
    },
    {
        id: 8,
        title: "3726 MDPL",
        author: "Brian Khrisna",
        category: "novel",
        synopsis: "Pendakian Gunung Semeru bukan sekadar perjalanan fisik, tapi juga peta batin tentang persahabatan, kehilangan, dan makna di balik setiap langkah. Di ketinggian, segalanya menjadi lebih jernih.",
        url: "https://online.pubhtml5.com/wdejy/yxex/"
    },
    {
        id: 9,
        title: "Kambing dan Hujan",
        author: "Mahfud Ikhwan",
        category: "novel",
        synopsis: "Kisah cinta yang terhalang keyakinan dan tradisi di sebuah desa. Dibungkus gaya bertutur yang unik, novel ini mengajak kita merenung tentang pilihan, pengorbanan, dan arti pulang.",
        url: "https://fliphtml5.com/dyage/zsti/KAMBING_DAN_HUJAN/"
    },
    {
        id: 10,
        title: "Seni Menjadi Bodo Amat",
        author: "Mark Manson",
        category: "lainnya",
        synopsis: "Berhenti peduli pada hal yang tidak penting, dan fokus pada apa yang benar-benar berarti. Buku ini membebaskan Anda dari tekanan untuk selalu sempurna—dengan cara yang blak-blakan dan menggelitik.",
        url: "https://online.pubhtml5.com/ueqj/dyas/"
    },
    {
        id: 11,
        title: "Bumi",
        author: "Tere Liye",
        category: "novel",
        synopsis: "Raib, Seli, dan Ali menemukan lorong menuju dunia paralel. Petualangan yang memadukan sains, fantasi, dan misteri—mengajak pembaca melampaui batas logika dan mempercayai hal-hal yang tak terlihat.",
        url: "https://online.pubhtml5.com/rwiac/bgqr/"
    },
    {
        id: 12,
        title: "Seporsi Mie Ayam Sebelum Mati",
        author: "Brian Khrisna",
        category: "novel",
        synopsis: "Tentang kematian, kehidupan, dan hal-hal sederhana yang sering kita lupakan. Sebuah pengingat bahwa di balik setiap hari biasa, ada makna yang menunggu untuk ditemukan.",
        url: "https://online.pubhtml5.com/wdejy/vukk/"
    },
    {
        id: 13,
        title: "Fundamentals of English Grammar (Third Ed) with Answer Key",
        author: "Betty Schrampfer Azar",
        category: "inggris",
        synopsis: "Buku tata bahasa Inggris paling sistematis untuk pelajar dari berbagai tingkat. Disertai latihan dan kunci jawaban—cocok untuk belajar mandiri maupun pendampingan kelas.",
        url: "https://online.pubhtml5.com/taoe/mdoe/"
    },
    {
        id: 14,
        title: "English for Everyone: Level 1 (Beginner)",
        author: "DK Publishing",
        category: "inggris",
        synopsis: "Pendekatan visual dan praktis untuk belajar bahasa Inggris dari nol. Dilengkapi ilustrasi, audio, dan latihan interaktif—cocok bagi siapa pun yang ingin memulai perjalanan berbahasa Inggris.",
        url: "https://online.pubhtml5.com/aywr/zscb/"
    },
    {
        id: 15,
        title: "La Tahzan",
        author: "Dr. Aidh Al-Qarni",
        category: "lainnya",
        synopsis: "Buku tentang cara menghadapi kesedihan dengan iman dan kesabaran. Mengajarkan bahwa setelah kesulitan selalu ada kemudahan—sebuah pengingat lembut untuk hati yang sedang lelah.",
        url: "https://online.pubhtml5.com/jnxyk/hktc/"
    },
    {
        id: 16,
        title: "Biografi Muhammad Bin Abdullah (edisi 2011)",
        author: "Zulkifli Mohd. Yusoff",
        category: "lainnya",
        synopsis: "Mengisahkan perjalanan hidup Nabi Muhammad SAW—dari kelahiran hingga kenabian. Dengan narasi yang mendalam dan penuh teladan, buku ini menghadirkan sosok paling berpengaruh sepanjang sejarah.",
        url: "https://online.fliphtml5.com/cwdun/yecr/"
    },
    {
        id: 17,
        title: "Find Out Rasulullah Habits",
        author: "Arafat",
        category: "lainnya",
        synopsis: "Mengupas kebiasaan harian Rasulullah SAW dalam ibadah, makan, tidur, hingga berinteraksi dengan sesama. Sebuah panduan sederhana untuk menghidupkan sunnah dalam keseharian.",
        url: "https://online.fliphtml5.com/haumn/aydj/"
    },
    {
        id: 18,
        title: "Dompet Ayah Sepatu Ibu",
        author: "J.S. Khairen",
        category: "novel",
        synopsis: "Zenna dan Asrul, dua anak rantau dari Sumatera Barat, berjuang menjadi sarjana pertama di keluarganya. Novel ini adalah tentang cinta, pengorbanan, dan mimpi yang tak pernah padam.",
        url: "https://fliphtml5.com/lzyxr/qqyh/Dompet_Ayah_Sepatu_Ibu_-_JS_Khairen/"
    },
    {
        id: 19,
        title: "Anagepesis",
        author: "Azhibnmjkfr",
        category: "novel",
        synopsis: "Dua hati yang perlahan menjadi asing di satu atap. Cinta yang dulu membakar hebat kini runtuh pelan tanpa suara, tanpa ada yang berkhianat—hanya jarak yang diam-diam merenggang.",
        url: "https://azhibnmjkfr.github.io/biluneshelf/coming-soon.html"
    },
    {
        id: 20,
        title: "Jarak Juli",
        author: "Azhibnmjkfr",
        category: "novel",
        synopsis: "Penantian di bulan Juli, di antara janji dan waktu yang terus berlalu. Sebuah kisah tentang seberapa jauh kita bisa melangkah sebelum godaan zaman mengikis semua yang pernah kita janjikan.",
        url: "https://azhibnmjkfr.github.io/biluneshelf/coming-soon.html"
    }
];
