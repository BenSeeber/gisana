import os
import streamlit.components.v1 as components
import psycopg2
import pandas as pd
import numpy as np

_RELEASE = False

def data_load():
    connection = psycopg2.connect(host="localhost",port=32768,database="gis",user="postgres", password="password")
    sql = """SELECT 
        ST_Y(ST_Transform (geom, 4326)) AS "lat",
        ST_X(ST_Transform (geom, 4326)) AS "lon",
        type
        FROM public."Parking_Pay_Station"
        ORDER BY id_0 ASC """
    data=pd.read_sql(sql,connection)
    return data

if not _RELEASE:
    _component_func = components.declare_component(
        "my_component",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("my_component", path=build_dir)


def my_component(name,marker,key=None):
    component_value = _component_func(name=name,marker=marker,key=key, default=0)
    return component_value


if not _RELEASE:
    import streamlit as st
    data = data_load().values.tolist()

    #result = my_component(name="Frank")
    st.subheader("Leaflet - return coords on click")
    clicked_coords = my_component(name="Frank",marker=data)
    st.markdown(clicked_coords)



