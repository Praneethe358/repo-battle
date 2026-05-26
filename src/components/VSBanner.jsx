import { motion } from 'framer-motion'
import { GiSwords } from 'react-icons/gi'
import { scaleIn } from '../animations/variants'

export default function VSBanner({ name1, name2 }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center gap-3 px-4 py-6"
    >
      {/* Name 1 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-mono font-bold text-purple-400 tracking-wider uppercase text-center"
      >
        {name1}
      </motion.div>

      {/* VS Core */}
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute w-24 h-24 rounded-full border border-dashed border-amber-400/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute w-16 h-16 rounded-full border border-dashed border-amber-400/30"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            filter: [
              'drop-shadow(0 0 10px rgba(245,158,11,0.5))',
              'drop-shadow(0 0 25px rgba(245,158,11,1))',
              'drop-shadow(0 0 10px rgba(245,158,11,0.5))',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/40 flex items-center justify-center z-10"
        >
          <GiSwords className="text-amber-400 text-2xl" />
        </motion.div>
      </div>

      <motion.span
        animate={{
          textShadow: [
            '0 0 20px rgba(245,158,11,0.6)',
            '0 0 40px rgba(245,158,11,1)',
            '0 0 20px rgba(245,158,11,0.6)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-3xl font-black text-amber-400 tracking-[0.3em]"
      >
        VS
      </motion.span>

      {/* Name 2 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-mono font-bold text-cyan-400 tracking-wider uppercase text-center"
      >
        {name2}
      </motion.div>
    </motion.div>
  )
}
