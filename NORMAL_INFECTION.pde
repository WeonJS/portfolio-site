

Agent[] agents = new Agent[100];
boolean vaccinated = false;
boolean masked = false;
//ArrayList<PVector> collisionPoints = new ArrayList<PVector>();

public enum HealthState {
  HEALTHY,
  INFECTED,
  DEAD,
  IMMUNE
}

public class Agent {
  float xpos = 0;
  float ypos = 0;
  
  float xvel = 0;
  float yvel = 0;
  
  int age = 0;
  
  
  //both influence by masks and vaccines
  int infectedDuration;
  boolean willSurvive = true;
  
  float ellipseRadius = 10;
  float survivalChance = 0;
  float infectedChance = 0;
  
  HealthState hs;
  
  
  public Agent(float xpos, float ypos, int age) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.infectedChance = 0.1;
    this.survivalChance = 0.1;
    
    this.age = age;
    setHealthState(HealthState.HEALTHY);
    if (random(0, 1) < 0.1) {
      hs = HealthState.INFECTED;
    }
  }
  
  void setHealthState(HealthState h) {
    if (hs == h)
      return;
      
    println(hs + "->" + h);
    switch (h) {
      case INFECTED:
        healthy--;
        infected++;
        hs = h;
        break;
      case DEAD:
        infected--;
        dead++;
        hs = h;
        break;
      case HEALTHY:
        healthy++;
        hs = h;
        break;
      case IMMUNE:
        healthy++;
        infected--;
        
        hs = h;
        break;
    }
  }
  
  void update() {
    
    
    
    if (hs == HealthState.INFECTED) {
      float rand = random(0, 1);
      if (rand < 0.0001) {
        setHealthState(HealthState.DEAD);
      } else if (rand > 0.999) {
        setHealthState(HealthState.IMMUNE);
      }
    }
    
    // set fill color based on health state
    switch (hs) {
      case HEALTHY:
        fill(200);
        break;
      case INFECTED:
        fill(0, 200, 0);
        break;
      case DEAD:
        fill(10);
        break;
      case IMMUNE:
        fill(0, 255, 255);
        break;
    }
    
    // physics updates
    if (hs != HealthState.DEAD) {
      xvel += random(-0.1, 0.1);
      yvel += random(-0.1, 0.1);
      
      yvel = constrain(yvel, -1, 1);
      xvel = constrain(xvel, -1, 1);
      
      xpos += xvel;
      ypos += yvel;
      
      if (xpos >= width-sidebarWidth || xpos <= 0) {
        xvel *= -1;
      }
      
      if (ypos >= height || ypos <= 0) {
        yvel *= -1;
      }
    }
    
    
    
    //entering collisions with other agents
    for (int i = 0; i < agents.length; i++) {
      if (agents[i] != this) {
        if (dist(xpos, ypos, agents[i].xpos, agents[i].ypos) <= INFECTION_DISTANCE+ellipseRadius) {
          if (hs == HealthState.INFECTED && agents[i].hs != HealthState.DEAD && agents[i].hs != HealthState.IMMUNE) {
            agents[i].setHealthState(HealthState.INFECTED);
          }
        }
      }
    }
    
    
    
    ellipse(xpos, ypos, ellipseRadius, ellipseRadius);
    //println(agents[0].isCollidingWith);
    //fill(255, 0, 255);
    //ellipse(agents[0].xpos, agents[0].ypos, ellipseRadius, ellipseRadius);
  }
}

float sidebarWidth = 220;
int infected = 0;
int dead = 0;
int healthy = 0;
int total = 0;

ArrayList<Integer> healthyEntries = new ArrayList<Integer>();
ArrayList<Integer> deadEntries = new ArrayList<Integer>();
ArrayList<Integer> infectedEntries = new ArrayList<Integer>();

final float INFECTION_DISTANCE = 6;


void setup() {
  size(700, 500);
  frameRate(60);
  for (int i = 0; i < agents.length; i++) {
    agents[i] = new Agent(random(0, width-sidebarWidth), random(0, height), (int)random(0, 100));
    total++;
  }
  
  // sidebar setup
  
  
}

void draw() {
  background(51);
  fill(255);
  rect(width-sidebarWidth, 0, width, height);
  
  // update agents
  for (Agent a : agents) {
    a.update();
  }
  
  // update entries
  healthy = constrain(healthy, 0, 100);
  dead = constrain(dead, 0, 100);
  infected = constrain(infected, 0, 100);
  
  healthyEntries.add(healthy);
  deadEntries.add(dead);
  infectedEntries.add(infected);
  
  //update sidebar
  fill(0);
  text("Healthy: ", width-sidebarWidth+20, 20);
  line(width-sidebarWidth+20, 30, width-sidebarWidth+20, 150);
  line(width-sidebarWidth+20, 150, width-10, 150);
  textSize(8);
  text("100%", width-sidebarWidth+1, 50);
  textSize(10);
  text("0%", width-sidebarWidth+4, 155);
  
  text("Infected: ", width-sidebarWidth+20, 165);
  line(width-sidebarWidth+20, 170, width-sidebarWidth+20,290);
  line(width-sidebarWidth+20, 290, width-10, 290);
  textSize(8);
  text("100%", width-sidebarWidth+1, 190);
  textSize(10);
  text("0%", width-sidebarWidth+4, 295);
  
  text("Dead: ", width-sidebarWidth+20, 306);
  line(width-sidebarWidth+20, 310, width-sidebarWidth+20, 430); // graph width; 182
  line(width-sidebarWidth+20, 430, width-10, 430);
  textSize(8);
  text("100%", width-sidebarWidth+1, 330);
  textSize(10);
  text("0%", width-sidebarWidth+4, 435);
  
  strokeWeight(0);
  fill(200);
  rect(width-sidebarWidth+20, height-60, 10, 10);
  fill(0, 255, 0);
  rect(width-sidebarWidth+20, height-50, 10, 10);
  fill(0);
  rect(width-sidebarWidth+20, height-40, 10, 10);
  fill(0, 255, 255);
  rect(width-sidebarWidth+20, height-30, 10, 10);
  
  textSize(12);
  
  setMasked(false);
  if (masked) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  rect(width-130, height-60, 100, 20);
  fill(0);
  text("Masked", width-100, height-45);
  
  if (vaccinated) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  
  rect(width-130, height-30, 100, 20);
  fill(0);
  text("Vaccinated", width-105, height-15);
  
  // all entry lists have the same size (they should)
  
  if (healthyEntries.size() < 85) {
    //healthy
    fill(255, 0, 0);
    stroke(255, 0, 0);
    strokeWeight(2);
    for (int i = 0; i < healthyEntries.size(); i++) {
      float entry = map(healthyEntries.get(i), 0, agents.length, 0, 100);
      if (i != 0) {
        float prevEntry = map(healthyEntries.get(i-1), 0, agents.length, 0, 100);
        line(width-sidebarWidth+((i-1)*2)+20, 150-prevEntry, width-sidebarWidth+(i*2)+20, 150 - entry);
      } else {
        line(width-sidebarWidth+20, 150, width-sidebarWidth+(i*2)+20, 150 - entry);
      }
    }
    
    float entry = map(healthy, 0, agents.length, 0, 100);
    text(""+healthy+"%", width-sidebarWidth+(healthyEntries.size()*2)+20, 150 - entry);
    
    //infected
    fill(0, 255, 0);
    stroke(0, 255, 0);
    strokeWeight(2);
    for (int i = 0; i < infectedEntries.size(); i++) {
      entry = map(infectedEntries.get(i), 0, agents.length, 0, 100);
      if (i != 0) {
        float prevEntry = map(infectedEntries.get(i-1), 0, agents.length, 0, 100);
        line(width-sidebarWidth+((i-1)*2)+20, 290-prevEntry, width-sidebarWidth+(i*2)+20, 290 - entry);
      } else {
        line(width-sidebarWidth+20, 290, width-sidebarWidth+(i*2)+20, 290 - entry);
      }
    }
    
    fill(0);
    entry = map(infected, 0, agents.length, 0, 100);
    text(""+infected+"%", width-sidebarWidth+(infectedEntries.size()*2)+20, 290 - entry);
    
    //dead
    fill(0, 255, 0);
    stroke(60);
    strokeWeight(2);
    for (int i = 0; i < deadEntries.size(); i++) {
      entry = map(deadEntries.get(i), 0, agents.length, 0, 100);
      if (i != 0) {
        float prevEntry = map(deadEntries.get(i-1), 0, agents.length, 0, 100);
        line(width-sidebarWidth+((i-1)*2)+20, 430-prevEntry, width-sidebarWidth+(i*2)+20, 430 - entry);
      } else {
        line(width-sidebarWidth+20, 430, width-sidebarWidth+(i*2)+20, 430 - entry);
      }
    }
    stroke(0);
    
    fill(0);
    entry = map(dead, 0, agents.length, 0, 100);
    text(""+dead+"%", width-sidebarWidth+(deadEntries.size()*2)+20, 430 - entry);
  } else if (healthyEntries.size() > 85) {
    float distBetweenPoints = 182.0f/healthyEntries.size();
    
    // healthy
    fill(255, 0, 0);
    stroke(255, 0, 0);
    strokeWeight(2);
    for (int i = 0; i < healthyEntries.size(); i++) {
      float entry = map(healthyEntries.get(i), 0, agents.length, 0, 100);
      if (i != 0) {
        float prevEntry = map(healthyEntries.get(i-1), 0, agents.length, 0, 100);
        line(width-sidebarWidth+((i-1)*distBetweenPoints)+20, 150-prevEntry, width-sidebarWidth+((i-1)*distBetweenPoints)+20, 150 - entry);
      } else {
        line(width-sidebarWidth+20, 150, width-sidebarWidth+(i*2)+20, 150 - entry);
      }
    }
    
    fill(0);
    float entry = map(healthy, 0, agents.length, 0, 100);
    text(""+healthy+"%", width-sidebarWidth+(85*2)+20, 150 - entry);
    
    // infected
    fill(0, 255, 0);
    stroke(0, 255, 0);
    strokeWeight(2);
    for (int i = 0; i < infectedEntries.size(); i++) {
      entry = map(infectedEntries.get(i), 0, agents.length, 0, 100);
      if (i != 0) {
        float prevEntry = map(infectedEntries.get(i-1), 0, agents.length, 0, 100);
        line(width-sidebarWidth+((i-1)*distBetweenPoints)+20, 290-prevEntry, width-sidebarWidth+((i-1)*distBetweenPoints)+20, 290 - entry);
      } else {
        line(width-sidebarWidth+20, 290, width-sidebarWidth+(i*2)+20, 290 - entry);
      }
    }
    
    fill(0);
    entry = map(infected, 0, agents.length, 0, 100);
    text(""+infected+"%", width-sidebarWidth+(85*2)+20, 290 - entry);
    
    //dead
    fill(150);
    stroke(150);
    strokeWeight(2);
    for (int i = 0; i < deadEntries.size(); i++) {
      entry = map(deadEntries.get(i), 0, agents.length, 0, 100);
      if (i != 0) {
        float prevEntry = map(deadEntries.get(i-1), 0, agents.length, 0, 100);
        line(width-sidebarWidth+((i-1)*distBetweenPoints)+20, 430-prevEntry, width-sidebarWidth+((i-1)*distBetweenPoints)+20, 430 - entry);
      } else {
        line(width-sidebarWidth+20, 430, width-sidebarWidth+(i*2)+20,430 - entry);
      }
    }
    
    fill(0);
    entry = map(dead, 0, agents.length, 0, 100);
    text(""+dead+"%", width-sidebarWidth+(85*2)+20, 430 - entry);
    
    stroke(0);
  }
  
  text("Healthy", width-sidebarWidth + 33, 448);
  text("Infected", width-sidebarWidth + 33, 458);
  text("Dead", width-sidebarWidth + 33, 468);
  text("Immune", width-sidebarWidth + 33, 478);
  
}



void setMasked(boolean m) {
  if (m) {
    for (int i = 0; i < agents.length; i++) {
      agents[i].infectedChance *= 0.7;
    }
  } else {
    for (int i = 0; i < agents.length; i++) {
      agents[i].infectedChance /= 0.7;
    }
    
  }
  masked = m;
}

void setVaccinated(boolean vaxd) {
  if (vaxd) {
    for (int i = 0; i < agents.length; i++) {
      agents[i].infectedChance *= 0.3;
    }
  } else {
    for (int i = 0; i < agents.length; i++) {
      agents[i].infectedChance /= 0.3;
    }
  }
  vaccinated = vaxd;
}
