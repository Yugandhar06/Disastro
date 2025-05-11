import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Float, Sparkles, useTexture, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Water } from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { suspend } from 'suspend-react';
import Globe from 'react-globe.gl';
import './Dashboard.css';

// Extend Three.js with custom objects
extend({ Water });

// 3D Disaster Models
function EarthquakeModel({ active }) {
  const meshRef = useRef();
  const [displacement, setDisplacement] = useState(0);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.2;
    
    // Earthquake effect
    if (active) {
      const intensity = Math.sin(time * 5) * 0.2;
      meshRef.current.material.displacementScale = intensity;
      setDisplacement(intensity);
    } else {
      meshRef.current.material.displacementScale = 0;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial 
          color="#ff5555"
          roughness={0.3}
          metalness={0.5}
          displacementScale={0}
          wireframe={active}
          emissive="#ff5555"
          emissiveIntensity={active ? 0.5 : 0}
        />
      </mesh>
      {active && (
        <>
          <Sparkles count={50} scale={2} size={3} speed={0.3} color="#ff5555" />
          <Text
            position={[0, -1.5, 0]}
            color="white"
            fontSize={0.3}
            maxWidth={2}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          >
            MAGNITUDE: {displacement.toFixed(2)}
          </Text>
        </>
      )}
    </group>
  );
}

function FloodModel({ active }) {
  const waterRef = useRef();
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms.time.value += delta * 0.5;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3, 32, 32]} />
        <meshStandardMaterial 
          color="#112240"
          roughness={0.8}
          metalness={0.2}
          wireframe={active}
        />
      </mesh>
      
      <water
        ref={waterRef}
        args={[
          new THREE.PlaneGeometry(10, 10),
          {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load(
              'https://threejs.org/examples/textures/waternormals.jpg',
              function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
              }
            ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0x4d96ff,
            waterColor: 0x001e0f,
            distortionScale: active ? 3.7 : 1,
            fog: true,
          }
        ]}
        rotation-x={-Math.PI / 2}
        position={[0, active ? 0.5 : 0.1, 0]}
      />
      
      {active && (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Text
            position={[0, 1, 0]}
            color="white"
            fontSize={0.3}
            maxWidth={2}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          >
            FLOOD LEVEL: CRITICAL
          </Text>
        </Float>
      )}
    </group>
  );
}

function WildfireModel({ active }) {
  const fireRef = useRef();
  const smokeRef = useRef();
  
  useFrame((state) => {
    if (!fireRef.current || !smokeRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Fire animation
    fireRef.current.position.y = Math.sin(time * 2) * 0.1;
    fireRef.current.material.emissiveIntensity = Math.sin(time * 3) * 0.5 + 1.5;
    
    // Smoke animation
    smokeRef.current.position.y = 1 + Math.sin(time * 0.5) * 0.1;
    smokeRef.current.rotation.y = time * 0.2;
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.8} />
      </mesh>
      
      <mesh ref={fireRef} position={[0, 0.5, 0]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshStandardMaterial 
          color="#ff9a3c"
          emissive="#ff3c3c"
          emissiveIntensity={active ? 2 : 1}
          wireframe={active}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {active && (
        <>
          <pointLight 
            position={[0, 1.5, 0]} 
            color="#ff7b3c" 
            intensity={5} 
            distance={8}
          />
          <mesh ref={smokeRef} position={[0, 1, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial 
              color="#555555"
              emissive="#333333"
              emissiveIntensity={0.5}
              transparent
              opacity={0.3}
              wireframe
            />
          </mesh>
          <Sparkles count={30} scale={3} size={2} speed={0.2} color="#ff9a3c" />
        </>
      )}
    </group>
  );
}

function HurricaneModel({ active }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.3;
    
    if (active) {
      groupRef.current.position.y = Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1.5, 0.3, 16, 100]} />
        <meshStandardMaterial 
          color="#4d96ff"
          emissive="#4d96ff"
          emissiveIntensity={active ? 0.5 : 0.1}
          wireframe={active}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#4d96ff"
          emissiveIntensity={active ? 1 : 0.2}
        />
      </mesh>
      {active && (
        <Text
          position={[0, -1.5, 0]}
          color="white"
          fontSize={0.3}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          CATEGORY 4
        </Text>
      )}
    </group>
  );
}

function TsunamiModel({ active }) {
  const waveRef = useRef();
  
  useFrame((state) => {
    if (!waveRef.current) return;
    
    const time = state.clock.getElapsedTime();
    waveRef.current.position.y = Math.sin(time * 2) * (active ? 0.3 : 0.1);
    waveRef.current.rotation.z = Math.sin(time) * 0.1;
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3, 32, 32]} />
        <meshStandardMaterial 
          color="#112240"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      <mesh ref={waveRef} position={[0, active ? 0.5 : 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 3.5, 32, 32]} />
        <meshStandardMaterial 
          color="#4d96ff"
          transparent
          opacity={0.8}
          wireframe={active}
          emissive="#4d96ff"
          emissiveIntensity={active ? 0.3 : 0}
        />
      </mesh>
      
      {active && (
        <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
          <Text
            position={[0, 1.2, 0]}
            color="white"
            fontSize={0.3}
            maxWidth={2}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          >
            TSUNAMI WARNING
          </Text>
        </Float>
      )}
    </group>
  );
}

function DisasterVisualization({ type, active }) {
  return (
    <div className="item-visualization">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 3]} />
        <Environment preset="city" />
        
        {type === 'earthquake' && <EarthquakeModel active={active} />}
        {type === 'flood' && <FloodModel active={active} />}
        {type === 'wildfire' && <WildfireModel active={active} />}
        {type === 'hurricane' && <HurricaneModel active={active} />}
        {type === 'tsunami' && <TsunamiModel active={active} />}
      </Canvas>
    </div>
  );
}

// Interactive 3D Globe Component
function InteractiveGlobe({ disasters }) {
  const globeRef = useRef();
  const [points, setPoints] = useState([]);
  
  useEffect(() => {
    if (!globeRef.current) return;
    
    // Auto-rotate
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.5;
    
    // Generate points with realistic locations
    const disasterPoints = disasters.map(d => {
      // Assign realistic coordinates based on location
      let lat, lng;
      
      switch(d.location.split(',')[0].trim().toLowerCase()) {
        case 'istanbul':
          lat = 41.0082;
          lng = 28.9784;
          break;
        case 'lagos':
          lat = 6.5244;
          lng = 3.3792;
          break;
        case 'athens':
          lat = 37.9838;
          lng = 23.7275;
          break;
        case 'miami':
          lat = 25.7617;
          lng = -80.1918;
          break;
        case 'sendai':
          lat = 38.2682;
          lng = 140.8694;
          break;
        default:
          // Random location if not specified
          lat = Math.random() * 160 - 80;
          lng = Math.random() * 360 - 180;
      }
      
      return {
        lat,
        lng,
        size: d.severity === 'High' ? 0.4 : d.severity === 'Medium' ? 0.25 : 0.15,
        color: d.type === 'Earthquake' ? '#ff5555' : 
               d.type === 'Flood' ? '#4d96ff' : 
               d.type === 'Wildfire' ? '#ff9a3c' :
               d.type === 'Hurricane' ? '#64ffda' : '#9c27b0'
      };
    });
    
    setPoints(disasterPoints);
  }, [disasters]);

  return (
    <div className="globe-container">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={points}
        pointAltitude={0}
        pointRadius="size"
        pointColor="color"
        pointResolution={16}
        pointMaterial={() => new THREE.MeshBasicMaterial({ 
          color: new THREE.Color(), 
          transparent: true,
          opacity: 0.8
        })}
        onPointClick={point => {
          globeRef.current.pointOfView(
            { lat: point.lat, lng: point.lng, altitude: 2 },
            1000
          );
        }}
      />
    </div>
  );
}

// Real-time Disaster Feed Component
function DisasterFeed({ disasters }) {
  const [activeDisaster, setActiveDisaster] = useState(null);
  const feedRef = useRef();

  useEffect(() => {
    if (disasters.length > 0 && !activeDisaster) {
      setActiveDisaster(disasters[0]);
    }
  }, [disasters]);

  const handleDisasterSelect = (disaster) => {
    setActiveDisaster(disaster);
    // Scroll to top of feed
    if (feedRef.current) {
      feedRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="disaster-feed">
      <div className="feed-viewer" ref={feedRef}>
        {activeDisaster && (
          <div className="active-disaster">
            <div className="disaster-visualization-container">
              <DisasterVisualization 
                type={activeDisaster.type.toLowerCase()} 
                active={true}
              />
            </div>
            <div className="disaster-info">
              <h3>{activeDisaster.type} in {activeDisaster.location}</h3>
              <div className="severity-indicator">
                <span className={`severity-dot ${activeDisaster.severity.toLowerCase()}`}></span>
                <span>{activeDisaster.severity} Severity</span>
              </div>
              <p className="disaster-date">{activeDisaster.date}</p>
              <p className="disaster-description">{activeDisaster.description}</p>
              <div className="disaster-stats">
                <div className="stat-item">
                  <span>Casualties</span>
                  <span className="stat-value">{activeDisaster.casualties}</span>
                </div>
                <div className="stat-item">
                  <span>Affected Area</span>
                  <span className="stat-value">{activeDisaster.area || '100 km²'}</span>
                </div>
                <div className="stat-item">
                  <span>Response Teams</span>
                  <span className="stat-value">{activeDisaster.teams || '12 deployed'}</span>
                </div>
              </div>
              <div className="disaster-actions">
                <button className="action-button primary">
                  <i className="fas fa-map-marked-alt"></i> View on Map
                </button>
                <button className="action-button secondary">
                  <i className="fas fa-hands-helping"></i> Relief Efforts
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="feed-list">
        {disasters.map((disaster) => (
          <div 
            key={disaster.id}
            className={`feed-item ${activeDisaster?.id === disaster.id ? 'active' : ''}`}
            onClick={() => handleDisasterSelect(disaster)}
          >
            <DisasterVisualization 
              type={disaster.type.toLowerCase()} 
              active={activeDisaster?.id === disaster.id}
            />
            <div className="item-info">
              <h4>{disaster.type}</h4>
              <p>{disaster.location}</p>
              <span className={`severity-badge ${disaster.severity.toLowerCase()}`}>
                {disaster.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3D Background Scene
function BackgroundScene() {
  return (
    <div className="background-scene">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

// Main Dashboard Component
const Dashboard = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [mapView, setMapView] = useState('globe');

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        // Simulated API response with realistic data
        const mockData = [
          {
            id: 1,
            type: 'Earthquake',
            location: 'Istanbul, Turkey',
            severity: 'High',
            date: new Date().toLocaleString(),
            description: '7.8 magnitude earthquake with multiple aftershocks reported. Buildings collapsed in several districts. Emergency services deployed.',
            casualties: 423,
            area: '150 km²',
            teams: '28 deployed',
            status: 'Ongoing'
          },
          {
            id: 2,
            type: 'Flood',
            location: 'Lagos, Nigeria',
            severity: 'Medium',
            date: new Date(Date.now() - 86400000).toLocaleString(),
            description: 'Heavy monsoon rains causing widespread flooding across the city. Thousands displaced from their homes. Relief camps established.',
            casualties: 127,
            area: '80 km²',
            teams: '15 deployed',
            status: 'Ongoing'
          },
          {
            id: 3,
            type: 'Wildfire',
            location: 'Athens, Greece',
            severity: 'Critical',
            date: new Date(Date.now() - 172800000).toLocaleString(),
            description: 'Wildfires spreading rapidly due to heatwave and strong winds. Residential areas evacuated. International assistance requested.',
            casualties: 89,
            area: '200 km²',
            teams: '32 deployed',
            status: 'Contained'
          },
          {
            id: 4,
            type: 'Hurricane',
            location: 'Miami, USA',
            severity: 'High',
            date: new Date(Date.now() - 259200000).toLocaleString(),
            description: 'Category 4 hurricane making landfall. Coastal areas flooded. Power outages reported across the region.',
            casualties: 56,
            area: '300 km²',
            teams: '45 deployed',
            status: 'Ongoing'
          },
          {
            id: 5,
            type: 'Tsunami',
            location: 'Sendai, Japan',
            severity: 'Critical',
            date: new Date(Date.now() - 345600000).toLocaleString(),
            description: 'Tsunami warning after undersea earthquake. Coastal evacuation orders in effect. Significant damage to infrastructure.',
            casualties: 312,
            area: '120 km²',
            teams: '38 deployed',
            status: 'Ongoing'
          }
        ];
        
        setDisasters(mockData);
      } catch (error) {
        console.error('Error fetching disaster data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setDisasters(prev => {
        if (prev.length === 0) return prev;
        const randomIndex = Math.floor(Math.random() * prev.length);
        const updated = [...prev];
        updated[randomIndex] = {
          ...updated[randomIndex],
          casualties: Math.min(500, updated[randomIndex].casualties + Math.floor(Math.random() * 5))
        };
        return updated;
      });
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredDisasters = disasters.filter(disaster => {
    return activeTab === 'all' || disaster.type.toLowerCase() === activeTab;
  });

  if (loading) {
    return (
      <div className="loading-screen">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Text
              position={[0, 0, 0]}
              color="#64ffda"
              fontSize={0.5}
              maxWidth={5}
              lineHeight={1}
              letterSpacing={0.02}
              textAlign="center"
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            >
              INITIALIZING GLOBAL DISASTER MONITORING
            </Text>
          </Float>
          
          <Sparkles count={100} scale={10} size={3} speed={0.3} />
          <Environment preset="city" />
        </Canvas>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <BackgroundScene />
      
      {/* Header with Emergency Alert */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>
            <span className="red-text">CRISIS</span>
            <span className="blue-text">COMMAND</span>
            <span className="subtitle">Global Disaster Management System</span>
          </h1>
        </div>
        <div className="header-right">
          <div className="emergency-alert">
            <div className="alert-indicator"></div>
            <span>ACTIVE EMERGENCY MODE</span>
          </div>
          <div className="time-filter">
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        {/* Global Overview Section */}
        <section className="global-overview">
          <div className="section-header">
            <h2>Global Disaster Overview</h2>
            <div className="view-toggle">
              <button 
                className={mapView === 'globe' ? 'active' : ''}
                onClick={() => setMapView('globe')}
              >
                <i className="fas fa-globe"></i> Globe View
              </button>
              <button 
                className={mapView === 'map' ? 'active' : ''}
                onClick={() => setMapView('map')}
              >
                <i className="fas fa-map"></i> Map View
              </button>
            </div>
          </div>
          
          <div className="overview-container">
            {mapView === 'globe' ? (
              <InteractiveGlobe disasters={filteredDisasters} />
            ) : (
              <div className="map-container">
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  
                  <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 10, 32, 32]} />
                    <meshStandardMaterial 
                      color="#112240"
                      roughness={0.8}
                      metalness={0.2}
                    />
                  </mesh>
                  
                  {filteredDisasters.map((disaster, index) => {
                    // Calculate positions for markers
                    const angle = (index / filteredDisasters.length) * Math.PI * 2;
                    const radius = 3;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    
                    return (
                      <group key={disaster.id} position={[x, 0.1, z]}>
                        <mesh>
                          <sphereGeometry args={[0.1, 16, 16]} />
                          <meshStandardMaterial 
                            color={
                              disaster.type === 'Earthquake' ? '#ff5555' : 
                              disaster.type === 'Flood' ? '#4d96ff' : 
                              disaster.type === 'Wildfire' ? '#ff9a3c' : '#64ffda'
                            }
                            emissive={
                              disaster.type === 'Earthquake' ? '#ff5555' : 
                              disaster.type === 'Flood' ? '#4d96ff' : 
                              disaster.type === 'Wildfire' ? '#ff9a3c' : '#64ffda'
                            }
                            emissiveIntensity={0.5}
                          />
                        </mesh>
                        <Text
                          position={[0, 0.3, 0]}
                          color="white"
                          fontSize={0.2}
                          maxWidth={2}
                          lineHeight={1}
                          letterSpacing={0.02}
                          textAlign="center"
                          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                        >
                          {disaster.location.split(',')[0]}
                        </Text>
                      </group>
                    );
                  })}
                </Canvas>
              </div>
            )}
            
            <div className="stats-panel">
              <div className="stat-card">
                <h3>Active Disasters</h3>
                <div className="stat-value">{filteredDisasters.length}</div>
                <div className="stat-trend up">+2% from yesterday</div>
              </div>
              <div className="stat-card">
                <h3>Total Casualties</h3>
                <div className="stat-value">
                  {filteredDisasters.reduce((sum, d) => sum + d.casualties, 0)}
                </div>
                <div className="stat-trend down">-5% from last week</div>
              </div>
              <div className="stat-card">
                <h3>Response Teams</h3>
                <div className="stat-value">
                  {filteredDisasters.reduce((sum, d) => sum + parseInt(d.teams || 0), 0)}
                </div>
                <div className="stat-trend up">+12% deployment</div>
              </div>
            </div>
          </div>
        </section>

        {/* Disaster Feed Section */}
        <section className="disaster-feed-section">
          <div className="section-header">
            <h2>Real-time Disaster Feed</h2>
            <div className="feed-filter">
              <button 
                className={activeTab === 'all' ? 'active' : ''}
                onClick={() => setActiveTab('all')}
              >
                All Events
              </button>
              <button 
                className={activeTab === 'earthquake' ? 'active' : ''}
                onClick={() => setActiveTab('earthquake')}
              >
                Earthquakes
              </button>
              <button 
                className={activeTab === 'flood' ? 'active' : ''}
                onClick={() => setActiveTab('flood')}
              >
                Floods
              </button>
              <button 
                className={activeTab === 'wildfire' ? 'active' : ''}
                onClick={() => setActiveTab('wildfire')}
              >
                Wildfires
              </button>
            </div>
          </div>
          
          <DisasterFeed disasters={filteredDisasters} />
        </section>

        {/* Response Teams Section */}
        <section className="response-section">
          <div className="section-header">
            <h2>Emergency Response Coordination</h2>
            <button className="action-button">
              <i className="fas fa-plus"></i> Deploy New Team
            </button>
          </div>
          
          <div className="response-grid">
            <div className="response-card">
              <div className="card-header medical">
                <h3>Medical Teams</h3>
                <div className="card-status">12 Active</div>
              </div>
              <div className="card-content">
                <div className="team-members">
                  <div className="member">
                    <div className="member-avatar"></div>
                    <span>Istanbul, TR</span>
                  </div>
                  <div className="member">
                    <div className="member-avatar"></div>
                    <span>Lagos, NG</span>
                  </div>
                  <div className="member">
                    <div className="member-avatar"></div>
                    <span>Athens, GR</span>
                  </div>
                  <div className="member more">
                    +9 more teams
                  </div>
                </div>
                <div className="card-actions">
                  <button className="action-button small">
                    <i className="fas fa-ambulance"></i> Dispatch
                  </button>
                </div>
              </div>
            </div>
            
            <div className="response-card">
              <div className="card-header search">
                <h3>Search & Rescue</h3>
                <div className="card-status">8 Active</div>
              </div>
              <div className="card-content">
                <div className="team-members">
                  <div className="member">
                    <div className="member-avatar"></div>
                    <span>Miami, US</span>
                  </div>
                  <div className="member">
                    <div className="member-avatar"></div>
                    <span>Sendai, JP</span>
                  </div>
                  <div className="member more">
                    +6 more teams
                  </div>
                </div>
                <div className="card-actions">
                  <button className="action-button small">
                    <i className="fas fa-search"></i> Deploy
                  </button>
                </div>
              </div>
            </div>
            
            <div className="response-card">
              <div className="card-header logistics">
                <h3>Logistics</h3>
                <div className="card-status">5 Active</div>
              </div>
              <div className="card-content">
                <div className="supply-list">
                  <div className="supply-item">
                    <i className="fas fa-utensils"></i>
                    <span>Food Supplies</span>
                  </div>
                  <div className="supply-item">
                    <i className="fas fa-prescription-bottle"></i>
                    <span>Medical Kits</span>
                  </div>
                  <div className="supply-item">
                    <i className="fas fa-tshirt"></i>
                    <span>Clothing</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="action-button small">
                    <i className="fas fa-truck"></i> Ship Supplies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Status Footer */}
      <footer className="dashboard-footer">
        <div className="footer-left">
          <div className="system-status">
            <div className="status-indicator active"></div>
            <span>SYSTEM STATUS: OPERATIONAL</span>
          </div>
          <div className="last-updated">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        <div className="footer-right">
          <button className="footer-button">
            <i className="fas fa-bell"></i> Alerts
          </button>
          <button className="footer-button">
            <i className="fas fa-cog"></i> Settings
          </button>
          <button className="footer-button emergency">
            <i className="fas fa-exclamation-triangle"></i> Emergency Protocol
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;