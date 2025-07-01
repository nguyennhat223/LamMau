import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  Mail, GraduationCap, CalendarDays, MapPin,
  User, X, Star, Award, Volume2, VolumeX
} from 'lucide-react';

// Bong bóng bay dùng CSS animation mượt hơn
const FloatingParticle = ({ config }) => (
  <div
    className="particle"
    style={{
      width: `${config.size}px`,
      height: `${config.size}px`,
      left: config.left,
      animationDuration: `${config.duration}s`,
      animationDelay: `${config.delay}s`,
      '--scale': config.scale,
    }}
  />
);

const FloatingBackground = () => {
  const particles = useRef(
    [...Array(30)].map(() => ({
      size: Math.random() * 5 + 2,
      left: `${Math.random() * 100}%`,
      scale: Math.random() * 1 + 0.5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 3,
    }))
  );

  return (
    <>
      {particles.current.map((config, i) => (
        <FloatingParticle key={i} config={config} />
      ))}
    </>
  );
};

// Confetti
const ConfettiPiece = ({ delay }) => {
  const colors = ['#facc15', '#fb923c', '#f87171', '#a78bfa'];
  return (
    <motion.div
      className="absolute rounded-full"
      initial={{ y: -20, opacity: 0, scale: 0.5 }}
      animate={{ y: '100%', opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: Math.random() * 2 + 1, delay, ease: 'easeOut' }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 80}%`,
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      }}
    />
  );
};

// Phong bì
const Envelope = ({ onOpen }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.5, opacity: 0 }}
    className="relative cursor-pointer group"
    onClick={onOpen}
  >
    <div className="w-[300px] h-[200px] md:w-[400px] md:h-[250px] perspective-1000">
      <motion.div
        className="absolute w-full h-full bg-indigo-900 rounded-lg shadow-2xl"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-800 to-slate-900 opacity-90 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Mail size={48} className="text-yellow-300 drop-shadow-lg" />
          </motion.div>
          <p className="font-semibold mt-2 text-lg text-shimmer">Bạn có thư mời!</p>
          <p className="text-sm opacity-70">Nhấn để mở</p>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Thiệp mời chính
const MobileInvitation = ({ onClose, isMusicPlaying, toggleMusic }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      key="invitation"
      initial={{ y: '100vh', opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: '100vh', opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="w-full max-w-sm h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[...Array(20)].map((_, i) => <ConfettiPiece key={i} delay={i * 0.1 + 0.5} />)}
      </div>

      <div className="absolute top-0 left-0 right-0 p-3 z-20 flex justify-between items-center">
        <motion.button
          onClick={toggleMusic}
          className="bg-black/20 hover:bg-black/40 backdrop-blur-sm p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          title={isMusicPlaying ? 'Tắt nhạc' : 'Mở nhạc'}
        >
          {isMusicPlaying ? <Volume2 size={20} className="text-white" /> : <VolumeX size={20} className="text-white" />}
        </motion.button>
        <motion.button
          onClick={onClose}
          className="bg-black/20 hover:bg-black/40 backdrop-blur-sm p-2 rounded-full"
          whileHover={{ scale: 1.1, rotate: 90 }}
        >
          <X size={20} className="text-white" />
        </motion.button>
      </div>

      <div className="flex-shrink-0 h-56 relative">
        <img className="absolute inset-0 w-full h-full object-cover" src="/image/image.jpg" alt="Graduation" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <motion.h1 className="text-4xl font-bold text-shimmer" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            THIỆP MỜI
          </motion.h1>
          <motion.p className="text-lg" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
            Lễ Tốt Nghiệp 2025
          </motion.p>
        </div>
      </div>

      <div className="flex-grow p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-purple-50">
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 15, -15, 15, 0] }} transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 8 }} className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full text-white shadow-lg">
            <GraduationCap size={40} />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">Trân trọng kính mời</h2>
          <p className="text-gray-600 mt-1">Đến tham dự buổi lễ tốt nghiệp của</p>
          <p className="text-2xl font-serif text-purple-800 mt-2">Nguyễn Tấn Nhật</p>
        </motion.div>

        <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-purple-100">
            <div className="p-2 bg-purple-100 rounded-full"><CalendarDays className="w-6 h-6 text-purple-600" /></div>
            <div className="ml-4"><h3 className="font-semibold text-gray-800">Thời gian</h3><p className="text-gray-600">9:00, Thứ 7, 05/07/2025</p></div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-green-100">
            <div className="p-2 bg-green-100 rounded-full"><MapPin className="w-6 h-6 text-green-600" /></div>
            <div className="ml-4"><h3 className="font-semibold text-gray-800">Địa điểm</h3><p className="text-gray-600">Hội trường Đại Học Huế</p></div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-sky-100">
            <div className="p-2 bg-sky-100 rounded-full"><User className="w-6 h-6 text-sky-600" /></div>
            <div className="ml-4"><h3 className="font-semibold text-gray-800">Trang phục</h3><p className="text-gray-600">Lịch sự hoặc lễ phục</p></div>
          </motion.div>
        </motion.div>

        <motion.div className="mt-8 text-center text-gray-500 italic p-4 border-t-2 border-dashed border-purple-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
          "Chặng đường mới, khởi đầu mới. Sự hiện diện của bạn là niềm vinh hạnh lớn lao."
        </motion.div>

        <motion.div className="flex justify-center mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 1 }}>
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 1.8 + i * 0.1 }}>
              <Star className="text-yellow-400" fill="currentColor" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// App chính
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const debounceRef = useRef(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      audioRef.current?.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(() => {});
    }, 0);
  };

  const handleClose = () => {
    setIsOpen(false);
    audioRef.current?.pause();
    setIsMusicPlaying(false);
  };

  const toggleMusic = () => {
    if (debounceRef.current) return;
    debounceRef.current = true;

    const audio = audioRef.current;
    if (!audio) return;

    if (audio.readyState >= 3) {
      if (audio.paused && !isMusicPlaying) {
        audio.play().then(() => setIsMusicPlaying(true));
      } else if (!audio.paused && isMusicPlaying) {
        audio.pause();
        setIsMusicPlaying(false);
      }
    }

    setTimeout(() => {
      debounceRef.current = false;
    }, 300);
  };

  return (
    <>
      <Helmet>
        <title>Thiệp Mời Lễ Tốt Nghiệp</title>
        <meta name="description" content="Thiệp mời tham dự lễ tốt nghiệp 2025." />
      </Helmet>

      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 overflow-hidden">
        <FloatingBackground />
        {!isOpen && <Envelope onOpen={handleOpen} />}
        <AnimatePresence mode="wait">
          {isOpen && (
            <MobileInvitation
              onClose={handleClose}
              isMusicPlaying={isMusicPlaying}
              toggleMusic={toggleMusic}
            />
          )}
        </AnimatePresence>
        <audio ref={audioRef} preload="auto" loop src="/audio/music.mp3" />
      </div>
    </>
  );
}

export default App;
