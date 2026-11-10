import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { PersonaConColor } from '../models/DTO/PersonaConColor';
import { PersonaViewModel } from '../viewModels/PersonaViewModel';

const weekDays = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

export default function PersonaExperience() {
  const { width } = useWindowDimensions();
  const compact = width < 720;
  const narrow = width < 420;
  const viewModel = useMemo(
    () => container.get<PersonaViewModel>(TYPES.PersonaViewModel),
    [],
  );
  const [persona, setPersona] = useState<PersonaConColor | null>(null);
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDay());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    viewModel.cargarPersona();
    setPersona(viewModel.personaActual);
    setError(viewModel.error);
    setIsLoading(viewModel.isLoading);
  }, [viewModel]);

  useEffect(() => {
    entrance.setValue(0);
    Animated.spring(entrance, {
      toValue: 1,
      damping: 18,
      stiffness: 115,
      mass: 0.8,
      useNativeDriver: false,
    }).start();
  }, [entrance, selectedDay]);

  const selectedDate = new Date();
  selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay() + selectedDay);
  const dayName = selectedDate.toLocaleDateString('es-ES', { weekday: 'long' });
  const dateLabel = selectedDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const initials = persona
    ? `${persona.nombre.charAt(0)}${persona.apellidos.charAt(0)}`.toUpperCase()
    : '';

  const selectDay = (dayIndex: number) => {
    setSelectedDay(dayIndex);
    setIsLoading(true);
    viewModel.cargarPersona(dayIndex);
    setPersona(viewModel.personaActual);
    setError(viewModel.error);
    setIsLoading(viewModel.isLoading);
  };

  const weekDayButtons = weekDays.map((day, index) => {
    const active = selectedDay === index;
    return (
      <Pressable
        key={day}
        accessibilityRole="button"
        accessibilityLabel={`${day}, perfil ${index + 1}`}
        accessibilityState={{ selected: active }}
        onPress={() => selectDay(index)}
        style={({ pressed }) => [
          styles.weekDay,
          narrow && styles.weekDayNarrow,
          active && styles.weekDayActive,
          active && persona && { backgroundColor: persona.color, borderColor: persona.color },
          pressed && styles.weekDayPressed,
        ]}
      >
        <Text style={[styles.weekDayIndex, active && styles.weekDayIndexActive]}>
          0{index + 1}
        </Text>
        <Text style={[styles.weekDayLabel, active && styles.weekDayLabelActive]}>
          {day}
        </Text>
      </Pressable>
    );
  });

  const profileMotion = {
    opacity: entrance,
    transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.shell}>
          <View style={styles.topbar}>
            <View style={styles.brandLockup}>
              <View style={styles.brandGlyph}><View style={styles.brandGlyphCore} /></View>
              <Text style={styles.brand}>PERSONA<Text style={styles.brandSlash}> / </Text>DÍA</Text>
            </View>
            <View style={styles.liveStatus}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>EDICIÓN SEMANAL · 07 PERFILES</Text>
            </View>
          </View>

          <View style={[styles.intro, compact && styles.introCompact]}>
            <View style={styles.introCopy}>
              <Text style={styles.eyebrow}>HOY EN EL CALENDARIO</Text>
              <Text numberOfLines={1} style={[styles.dayTitle, narrow && styles.dayTitleNarrow]}>
                {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
                <Text style={[styles.dayPunctuation, persona && { color: persona.color }]}>.</Text>
              </Text>
              <Text style={styles.fullDate}>{dateLabel.toUpperCase()}</Text>
            </View>
            <View style={styles.editionStamp}>
              <Text style={styles.stampNumber}>0{selectedDay + 1}</Text>
              <View style={styles.stampRule} />
              <Text style={styles.stampCaption}>DE LA SEMANA</Text>
            </View>
          </View>

          <View style={styles.weekNav}>
            <View style={styles.weekNavHeading}>
              <Text style={styles.weekNavTitle}>RECORRIDO SEMANAL</Text>
              <Text style={styles.weekNavHint}>SELECCIONA UN DÍA</Text>
            </View>
            {narrow ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.weekDaysNarrow}
              >
                {weekDayButtons}
              </ScrollView>
            ) : (
              <View style={styles.weekDays}>{weekDayButtons}</View>
            )}
          </View>

          <View style={[styles.profileLayout, compact && styles.profileLayoutCompact]}>
            {isLoading ? (
              <ActivityIndicator style={styles.loader} color="#e7ff75" />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : persona ? (
              <Animated.View style={[styles.profileLayout, compact && styles.profileLayoutCompact, profileMotion]}>
                <View style={[styles.colorPanel, compact && styles.colorPanelCompact, { backgroundColor: persona.color }]}>
                  <View style={styles.panelTopline}>
                    <Text style={styles.panelTopText}>IDENTIDAD</Text>
                    <Text style={styles.panelTopText}>N.º 0{selectedDay + 1}</Text>
                  </View>
                  <Text style={styles.panelWatermark}>0{selectedDay + 1}</Text>
                  <View style={styles.monogramWrap}>
                    <Text style={styles.monogram}>{initials}</Text>
                    <View style={styles.monogramUnderline} />
                  </View>
                  <View style={styles.panelBottomline}>
                    <Text style={styles.panelBottomText}>PERFIL ACTIVO</Text>
                    <View style={styles.panelSignal} />
                  </View>
                </View>

                <View style={[styles.profileDetails, compact && styles.profileDetailsCompact]}>
                  <View style={styles.detailKickerRow}>
                    <View style={[styles.colorKey, { backgroundColor: persona.color }]} />
                    <Text style={styles.detailKicker}>SELECCIÓN DEL {dayName.toUpperCase()}</Text>
                  </View>
                  <Text style={[styles.personName, narrow && styles.personNameNarrow]}>{persona.nombre}</Text>
                  <Text style={[styles.personSurname, narrow && styles.personSurnameNarrow]}>{persona.apellidos}</Text>
                  <View style={styles.nameDivider} />

                  <View style={styles.metadataGrid}>
                    <View style={styles.metadataCell}>
                      <Text style={styles.metadataLabel}>IDENTIFICADOR</Text>
                      <Text style={styles.metadataValue}>{persona.id}</Text>
                    </View>
                    <View style={styles.metadataCell}>
                      <Text style={styles.metadataLabel}>FECHA DE NACIMIENTO</Text>
                      <Text style={styles.metadataValue}>{persona.fechaNacimiento.toLocaleDateString('es-ES')}</Text>
                    </View>
                  </View>

                  <View style={styles.selectionNote}>
                    <Text style={styles.selectionNoteMark}>↳</Text>
                    <Text style={styles.selectionNoteText}>
                      Una identidad distinta para cada día. Vuelve al día actual desde el selector semanal.
                    </Text>
                  </View>
                </View>
              </Animated.View>
            ) : null}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerBrand}>PERSONA / DÍA</Text>
            <Text style={styles.footerSequence}>DOMINGO <Text style={styles.footerArrow}>→</Text> SÁBADO</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A1110',
  },
  scrollContent: {
    flexGrow: 1,
  },
  shell: {
    flex: 1,
    width: '100%',
    maxWidth: 1240,
    alignSelf: 'center',
    paddingHorizontal: 30,
  },
  topbar: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#293330',
  },
  brandLockup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandGlyph: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e7ff75',
    transform: [{ rotate: '45deg' }],
  },
  brandGlyphCore: {
    width: 5,
    height: 5,
    backgroundColor: '#e7ff75',
  },
  brand: {
    color: '#f3f5ef',
    fontSize: 11,
    fontWeight: '800',
  },
  brandSlash: {
    color: '#73827b',
    fontWeight: '500',
  },
  liveStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    marginRight: 8,
    backgroundColor: '#e7ff75',
  },
  liveText: {
    color: '#91a098',
    fontSize: 9,
    fontWeight: '700',
  },
  intro: {
    minHeight: 210,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 22,
  },
  introCompact: {
    minHeight: 180,
  },
  introCopy: {
    flex: 1,
    minWidth: 0,
  },
  eyebrow: {
    color: '#91a098',
    fontSize: 10,
    fontWeight: '700',
  },
  dayTitle: {
    marginTop: 6,
    color: '#f3f5ef',
    fontFamily: 'Georgia',
    fontSize: 76,
    fontWeight: '700',
    lineHeight: 84,
  },
  dayTitleNarrow: {
    fontSize: 42,
    lineHeight: 50,
  },
  dayPunctuation: {
    color: '#e7ff75',
  },
  fullDate: {
    marginTop: 5,
    color: '#e7ff75',
    fontSize: 10,
    fontWeight: '800',
  },
  editionStamp: {
    width: 74,
    alignItems: 'flex-end',
    marginLeft: 12,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#35413c',
  },
  stampNumber: {
    color: '#f3f5ef',
    fontSize: 29,
    fontWeight: '800',
  },
  stampRule: {
    width: 36,
    height: 2,
    marginTop: 2,
    backgroundColor: '#e7ff75',
  },
  stampCaption: {
    marginTop: 7,
    color: '#91a098',
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'right',
  },
  weekNav: {
    paddingTop: 14,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#293330',
  },
  weekNavHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekNavTitle: {
    color: '#f3f5ef',
    fontSize: 9,
    fontWeight: '800',
  },
  weekNavHint: {
    color: '#73827b',
    fontSize: 8,
    fontWeight: '700',
  },
  weekDays: {
    flexDirection: 'row',
  },
  weekDaysNarrow: {
    paddingRight: 7,
  },
  weekDay: {
    flex: 1,
    minHeight: 58,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#293330',
    marginRight: 7,
  },
  weekDayActive: {
    borderColor: '#e7ff75',
  },
  weekDayNarrow: {
    flex: 0,
    width: 68,
    minWidth: 68,
    flexShrink: 0,
  },
  weekDayPressed: {
    opacity: 0.72,
    transform: [{ translateY: 1 }],
  },
  weekDayIndex: {
    color: '#73827b',
    fontSize: 8,
    fontWeight: '700',
  },
  weekDayIndexActive: {
    color: '#111714',
  },
  weekDayLabel: {
    marginTop: 5,
    color: '#c4cec7',
    fontSize: 11,
    fontWeight: '800',
  },
  weekDayLabelActive: {
    color: '#111714',
  },
  profileLayout: {
    flex: 1,
    minHeight: 390,
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 28,
  },
  profileLayoutCompact: {
    minHeight: 0,
    flexDirection: 'column',
    paddingTop: 18,
    paddingBottom: 20,
  },
  colorPanel: {
    position: 'relative',
    width: '42%',
    minHeight: 340,
    justifyContent: 'space-between',
    overflow: 'hidden',
    padding: 22,
  },
  colorPanelCompact: {
    width: '100%',
    minHeight: 242,
    padding: 17,
  },
  panelTopline: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  panelTopText: {
    color: '#101513',
    fontSize: 8,
    fontWeight: '800',
  },
  panelWatermark: {
    position: 'absolute',
    right: -9,
    top: 34,
    color: '#101513',
    fontSize: 176,
    fontWeight: '900',
    lineHeight: 188,
    opacity: 0.1,
  },
  monogramWrap: {
    zIndex: 1,
    alignItems: 'flex-start',
  },
  monogram: {
    color: '#101513',
    fontFamily: 'Georgia',
    fontSize: 82,
    fontWeight: '700',
  },
  monogramUnderline: {
    width: 42,
    height: 4,
    marginTop: 7,
    backgroundColor: '#101513',
  },
  panelBottomline: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelBottomText: {
    color: '#101513',
    fontSize: 8,
    fontWeight: '800',
  },
  panelSignal: {
    width: 7,
    height: 7,
    backgroundColor: '#101513',
  },
  profileDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 42,
  },
  profileDetailsCompact: {
    paddingLeft: 0,
    paddingTop: 24,
  },
  detailKickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  colorKey: {
    width: 7,
    height: 7,
    marginRight: 8,
  },
  detailKicker: {
    color: '#91a098',
    fontSize: 9,
    fontWeight: '800',
  },
  personName: {
    color: '#f3f5ef',
    fontFamily: 'Georgia',
    fontSize: 54,
    fontWeight: '700',
    lineHeight: 61,
  },
  personNameNarrow: {
    fontSize: 42,
    lineHeight: 48,
  },
  personSurname: {
    color: '#b8c5bd',
    fontFamily: 'Georgia',
    fontSize: 39,
    lineHeight: 47,
  },
  personSurnameNarrow: {
    fontSize: 31,
    lineHeight: 38,
  },
  nameDivider: {
    width: 54,
    height: 2,
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: '#39443f',
  },
  metadataGrid: {
    flexDirection: 'row',
  },
  metadataCell: {
    flex: 1,
    minWidth: 0,
  },
  metadataLabel: {
    color: '#73827b',
    fontSize: 8,
    fontWeight: '800',
  },
  metadataValue: {
    marginTop: 7,
    color: '#f3f5ef',
    fontSize: 14,
    fontWeight: '700',
  },
  selectionNote: {
    flexDirection: 'row',
    marginTop: 28,
  },
  selectionNoteMark: {
    marginRight: 9,
    color: '#e7ff75',
    fontSize: 13,
    fontWeight: '700',
  },
  selectionNoteText: {
    flex: 1,
    color: '#91a098',
    fontSize: 10,
    lineHeight: 16,
  },
  loader: {
    marginVertical: 90,
  },
  errorText: {
    margin: 30,
    color: '#ff8876',
    fontSize: 14,
  },
  footer: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#293330',
  },
  footerBrand: {
    color: '#f3f5ef',
    fontSize: 9,
    fontWeight: '800',
  },
  footerSequence: {
    color: '#91a098',
    fontSize: 8,
    fontWeight: '700',
  },
  footerArrow: {
    color: '#e7ff75',
  },
});