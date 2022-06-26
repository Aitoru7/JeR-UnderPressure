package es.urjc.code.juegosenred;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class NumbersHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private List<WebSocketSession> jugadores = new ArrayList<WebSocketSession>();
	AtomicInteger nextId = new AtomicInteger(0);
	Integer suma = 0;
	Integer suma2 = 0;
	Integer averias = 0;
	private Object mutex = new Object();
	Integer[] listaverias = new Integer[3];
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		int id = nextId.getAndIncrement();
		//System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		jugadores.add(id, session);
		//System.out.println(jugadores.get(id));
		//System.out.println(session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {	
		for(int i = 0; i < jugadores.size(); i++) {
			if(jugadores.get(i).equals(session)) {
				jugadores.remove(i);
				nextId.getAndDecrement();
			}
		}
		sessions.remove(session.getId());
		
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		//System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {
		//System.out.println("Message sent: " + node.toString());
		//System.out.println(node.get("name").asText());
		String text = node.get("name").asText();
		//System.out.println(text);
		if(text.equals("random")) {
			listaverias[0] = node.get("averia1").asInt();
			listaverias[1] = node.get("averia2").asInt();
			listaverias[2] = node.get("averia3").asInt();
			synchronized(mutex) {
				if(suma == 0) {
					suma += 1;	
					do {
						averias = (int)(Math.floor(Math.random() * 3));
					}while(listaverias[averias] == 1);	
					
				}else{
					suma = 0;	
				}
			}
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("posicion", averias);
			newNode.put("diferenciador", "averias");
			session.sendMessage(new TextMessage(newNode.toString()));	

		}else {
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("name", node.get("name").asText());
			
			for(WebSocketSession participant : sessions.values()) {
				if(!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
		}
	}
}