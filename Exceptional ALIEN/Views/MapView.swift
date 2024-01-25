//
//  MapView.swift
//  Exceptional ALIEN
//
//  Created by Adam Johnson on 25/1/2024.
//

import SwiftUI
@_spi(Experimental) import MapboxMaps

struct MapView: View {
    let myCustomStyle = MapStyle(uri: StyleURI(rawValue: "mapbox://styles/exceptionalalien/clregikmx003q01rbc9iye3dt")!)
    let center = CLLocationCoordinate2D(latitude: -33.86833081055127, longitude: 151.20795374306286)
    
    var body: some View {
        Map(initialViewport: .camera(center: center, zoom: 12))
            .mapStyle(myCustomStyle)
            .ornamentOptions(OrnamentOptions(
                scaleBar: ScaleBarViewOptions(visibility: .hidden)
            ))
            .ignoresSafeArea()
    }
}

#Preview {
    MapView()
}
