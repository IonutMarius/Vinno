package ro.uaic.info.vinno.bean;

import java.io.Serializable;

public class ResponseBody<T> implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private T data;
	private String message;
	
	public ResponseBody(){};
	public ResponseBody(T data, String message){
		this.data = data;
		this.message = message;
	}
	
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}	
}
